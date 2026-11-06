import hmac
import logging

import pyotp
from sqlalchemy.exc import IntegrityError

from auth.auth_server.controllers.base import BaseController
from auth.auth_server.controllers.base_async import BaseAsyncControllerWrapper
from auth.auth_server.controllers.verification_code import (
    VerificationCodeController)
from auth.auth_server.exceptions import Err
from auth.auth_server.models.models import (
    MFAMethod, MFAType, VerificationCodePurpose)
from auth.auth_server.utils import (
    TOTP_DIGITS, TOTP_PERIOD, build_otpauth_uri, check_kwargs_is_empty,
    check_string_attribute, decrypt_mfa_secret, encrypt_mfa_secret,
    mask_email)
from tools.optscale_exceptions.common_exc import (
    ConflictException, ForbiddenException, NotFoundException,
    WrongArgumentsException)
from tools.optscale_time import utcnow_timestamp

LOG = logging.getLogger(__name__)
# an enrollment not confirmed within this time is discarded
PENDING_LIFETIME_MIN = 15
# TOTP steps accepted before and after the current one (clock drift)
TOTP_VALID_WINDOW = 1
LABEL_MAX_LENGTH = 256


class MfaMethodController(BaseController):
    def _get_model_type(self):
        return MFAMethod

    @staticmethod
    def _pending_cutoff():
        return utcnow_timestamp() - PENDING_LIFETIME_MIN * 60

    def _get_methods(self, user_id, type_=None):
        query = self.session.query(MFAMethod).filter(
            MFAMethod.user_id == user_id,
            MFAMethod.deleted.is_(False),
        )
        if type_ is not None:
            query = query.filter(MFAMethod.type == type_)
        return query.all()

    def _discard_stale_pending(self, user_id):
        # never-confirmed rows have no history worth keeping, so they are
        # removed instead of soft-deleted (this also avoids deleted_at
        # collisions on the user/type/deleted_at unique constraint)
        self.session.query(MFAMethod).filter(
            MFAMethod.user_id == user_id,
            MFAMethod.deleted.is_(False),
            MFAMethod.confirmed_at == 0,
            MFAMethod.created_at < self._pending_cutoff(),
        ).delete(synchronize_session=False)

    @staticmethod
    def _check_type(type_):
        if type_ is None:
            raise WrongArgumentsException(Err.OA0032, ['type'])
        if not isinstance(type_, str):
            raise WrongArgumentsException(Err.OA0033, ['type'])
        try:
            return MFAType(type_)
        except ValueError:
            raise WrongArgumentsException(Err.OA0060, ['type'])

    def create(self, user_id, token=None, **kwargs):
        """
        Starts an enrollment: creates a pending method of the given type.
        For totp the response carries the plain seed and the otpauth URI
        (the only time they are exposed), for email a code is sent to the
        user's address.
        """
        type_ = self._check_type(kwargs.pop('type', None))
        label = kwargs.pop('label', None)
        check_kwargs_is_empty(**kwargs)
        if label is not None:
            check_string_attribute('label', label,
                                   max_length=LABEL_MAX_LENGTH)
        user = self.check_user_access(user_id, token)
        self._discard_stale_pending(user.id)
        existing = self._get_methods(user.id, type_)
        if any(m.confirmed for m in existing):
            raise ConflictException(Err.OA0082, [type_.value])
        seed = None
        if type_ == MFAType.totp:
            seed = pyotp.random_base32()
            secret = encrypt_mfa_secret(seed)
        else:
            secret = None
            label = mask_email(user.email)
            # sent before anything is changed: if it is throttled or herald
            # is down, a previous pending enrollment is left untouched
            VerificationCodeController(
                self.session, self._config).send_mfa_code(user)
        # restarting an unfinished enrollment replaces it
        for pending in existing:
            self.session.delete(pending)
        # the unit of work runs INSERTs before DELETEs: flush now or the
        # new row clashes with the replaced one on the unique constraint
        self.session.flush()
        method = MFAMethod(user_id=user.id, type=type_, secret=secret,
                           label=label, is_default=False)
        self.session.add(method)
        try:
            self.session.commit()
        except IntegrityError:
            # concurrent enrollment of the same type
            self.session.rollback()
            raise ConflictException(Err.OA0082, [type_.value])
        LOG.info('MFA method %s (%s) enrollment started for user %s',
                 method.id, type_.value, user.id)
        result = method.to_dict()
        if seed is not None:
            result['secret'] = seed
            result['otpauth_uri'] = build_otpauth_uri(
                self._config.product_name(), user.email, seed)
        return result

    def _verify_totp(self, method, code):
        totp = pyotp.TOTP(decrypt_mfa_secret(method.secret),
                          digits=TOTP_DIGITS, interval=TOTP_PERIOD)
        current = utcnow_timestamp() // TOTP_PERIOD
        for step in range(current - TOTP_VALID_WINDOW,
                          current + TOTP_VALID_WINDOW + 1):
            if not hmac.compare_digest(totp.generate_otp(step), code):
                continue
            # replay protection: a step is accepted only if it is newer than
            # the last accepted one; the conditional update makes it atomic
            # so two concurrent requests with the same code cannot both pass
            updated = self.session.query(MFAMethod).filter(
                MFAMethod.id == method.id,
                MFAMethod.last_used_step < step,
            ).update({MFAMethod.last_used_step: step},
                     synchronize_session=False)
            self.session.commit()
            self.session.refresh(method)
            return updated == 1
        return False

    def _verify_email(self, method, code):
        used = self.use_verification_code(
            method.user.email, code, VerificationCodePurpose.mfa)
        self.session.commit()
        return bool(used)

    def verify_code(self, method, code):
        """
        Checks a code for the method. TOTP codes are accepted once
        (replay protection), e-mail codes are consumed.
        Reused by the login challenge (MPT-26346).
        """
        if not isinstance(code, str) or len(code) != TOTP_DIGITS or \
                not code.isdigit():
            return False
        if method.type == MFAType.totp:
            return self._verify_totp(method, code)
        return self._verify_email(method, code)

    def get_method(self, user_id, method_id):
        method = self.session.query(MFAMethod).filter(
            MFAMethod.id == method_id,
            MFAMethod.user_id == user_id,
            MFAMethod.deleted.is_(False),
        ).one_or_none()
        if method is None:
            raise NotFoundException(
                Err.OA0003, [MFAMethod.__name__, method_id])
        return method

    def confirm(self, user_id, method_id, token=None, **kwargs):
        code = kwargs.pop('code', None)
        check_kwargs_is_empty(**kwargs)
        if code is None:
            raise WrongArgumentsException(Err.OA0032, ['code'])
        if not isinstance(code, str):
            raise WrongArgumentsException(Err.OA0033, ['code'])
        user = self.check_user_access(user_id, token)
        method = self.get_method(user.id, method_id)
        if method.confirmed:
            raise ConflictException(Err.OA0084, [method_id])
        if method.created_at < self._pending_cutoff():
            # expired enrollment, it is discarded on the next create
            raise NotFoundException(
                Err.OA0003, [MFAMethod.__name__, method_id])
        if not self.verify_code(method, code):
            LOG.info('Invalid code for MFA method %s of user %s',
                     method.id, user.id)
            raise ForbiddenException(Err.OA0083, [])
        has_confirmed = any(
            m.confirmed for m in self._get_methods(user.id))
        method.confirmed_at = utcnow_timestamp()
        method.is_default = not has_confirmed
        self.session.commit()
        LOG.info('MFA method %s (%s) confirmed for user %s', method.id,
                 method.type.value, user.id)
        return method


class MfaMethodAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return MfaMethodController
