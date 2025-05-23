import logging
import re
from sqlalchemy.sql import func
from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError
from auth.zoho_integrator.zoho_integrator import ZohoIntegrator
from auth.zoho_integrator.zoho_client import ZohoClient
from auth.zoho_integrator.registered_app import RegisteredApp
from auth.auth_server.controllers.base import BaseController
from auth.auth_server.controllers.base_async import BaseAsyncControllerWrapper
from auth.auth_server.exceptions import Err
from auth.auth_server.models.models import User, gen_salt, Type, Token
from auth.auth_server.utils import (
    check_action, hash_password, is_email_format, get_input,
    check_string_attribute, check_bool_attribute, is_hystax_email,
    is_demo_email)
from tools.optscale_time import utcnow
from tools.optscale_password import PasswordValidator
from tools.optscale_exceptions.common_exc import (
    WrongArgumentsException, ForbiddenException, NotFoundException,
    ConflictException)
from optscale_client.config_client.client import etcd

LOG = logging.getLogger(__name__)


class UserController(BaseController):
    def _get_model_type(self):
        return User

    def _get_input(self, **input_):
        email = input_.get('email')
        display_name = input_.get('display_name')
        is_active = input_.get('is_active', True)
        password = input_.get('password')
        type_id = input_.get('type_id')
        scope_id = input_.get('scope_id')
        is_password_autogenerated = input_.get(
            'is_password_autogenerated', False)
        self_registration = input_.get('self_registration', False)
        verified = input_.get('verified', False)
        if self._config.disable_email_verification():
            verified = True
        if self_registration:
            root_type = self.session.query(Type).filter(
                and_(
                    Type.deleted.is_(False),
                    Type.parent_id.is_(None)
                )
            ).one_or_none()
            if not root_type:
                raise NotFoundException(Err.OA0064, [])
            type_id = root_type.id
        return (email, display_name, is_active, password, type_id, scope_id,
                is_password_autogenerated, verified)

    @staticmethod
    def _is_self_edit(user, user_to_edit_id):
        return user.id == user_to_edit_id

    @property
    def domain_blacklist(self):
        try:
            return self._config.domains_blacklist(blacklist_key='registration')
        except etcd.EtcdKeyNotFound:
            return []

    @property
    def domain_whitelist(self):
        try:
            return self._config.domains_whitelist(whitelist_key='registration')
        except etcd.EtcdKeyNotFound:
            return []

    def _check_input(self, email, display_name, is_active, password,
                     type_id, scope_id):
        def is_match(domain_exp, email_str):
            if domain_exp.startswith('@'):
                domain_regex = f'{re.escape(domain_exp)}$'
            elif domain_exp.startswith('/'):
                domain_regex = domain_exp[1:]
            else:
                domain_regex = f'@{re.escape(domain_exp)}$'
            return re.search(domain_regex, email_str.lower())

        if email is None or password is None:
            raise WrongArgumentsException(Err.OA0039, [])
        domain_whitelist = self.domain_whitelist
        for domain in self.domain_blacklist:
            if is_match(domain, email):
                raise WrongArgumentsException(Err.OA0070, [domain])
        if domain_whitelist:
            in_whitelist = any(filter(
                lambda x: is_match(x, email), domain_whitelist))
            if not in_whitelist:
                raise WrongArgumentsException(
                    Err.OA0070, [email.split('@')[-1]])
        if type_id is None:
            raise WrongArgumentsException(Err.OA0031, ['type_id'])
        if not isinstance(type_id, int):
            raise WrongArgumentsException(Err.OA0049, ['type_id'])
        if scope_id is not None:
            if not isinstance(scope_id, str):
                raise WrongArgumentsException(Err.OA0033, ['scope_id'])
            check_string_attribute('scope_id', scope_id)
        self.check_email(email)
        if display_name is None:
            raise WrongArgumentsException(Err.OA0031, ['display_name'])
        if not isinstance(display_name, str):
            raise WrongArgumentsException(Err.OA0033, ['display_name'])
        check_string_attribute('display_name', display_name)
        self._check_password(password)

    def _check_password(self, password):
        pass_validator = PasswordValidator()
        try:
            settings = self._config.password_strength_settings()
            pass_validator.change_settings(
                **settings
            )
        except etcd.EtcdKeyNotFound:
            pass
        try:
            pass_validator.validate(password)
        except ValueError as ex:
            raise WrongArgumentsException(Err.OA0074, [str(ex)])

    def get_user_by_email(self, email):
        return self.session.query(User).filter(
            User.email == email,
            User.deleted.is_(False)
        ).one_or_none()

    def _sync_user_with_zoho(self, display_name, email):
        if is_hystax_email(email) or is_demo_email(email):
            return
        try:
            reg_app = RegisteredApp.get_from_etcd(self._config)
            if reg_app:
                zoho_client = ZohoClient(reg_app)
                zoho_integrator = ZohoIntegrator(zoho_client)
                zoho_integrator.create_or_update(email, display_name)
                LOG.info(
                    "User %s was successfully synced with zoho", display_name)
        except Exception as e:
            LOG.info("Wasn't able to sync new user with zoho. Err: %s", str(e))

    def create(self, **kwargs):
        token = kwargs.pop('token')
        self_registration = kwargs.pop('self_registration', False)
        self.check_create_restrictions(**kwargs)
        (email, display_name, is_active, password, type_id,
         scope_id, is_password_autogenerated, verified) = self._get_input(
            self_registration=self_registration, **kwargs)
        self._check_input(email, display_name, is_active, password, type_id,
                          scope_id)
        if not self_registration:
            res_type = self.get_type(type_id)
            action_resources = self.get_action_resources(token,
                                                         ['CREATE_USER'])
            if not check_action(action_resources, 'CREATE_USER', res_type.name,
                                scope_id):
                raise ForbiddenException(Err.OA0012, [])

        duplicated_user = self.get_user_by_email(email)
        if duplicated_user:
            raise ConflictException(Err.OA0042, [email])
        salt = gen_salt()
        user = User(
            email=email,
            salt=salt,
            password=hash_password(password, salt),
            scope_id=scope_id,
            type_id=type_id,
            display_name=display_name,
            is_active=is_active,
            is_password_autogenerated=is_password_autogenerated,
            verified=verified
        )
        self.session.add(user)
        try:
            self.session.commit()
        except IntegrityError as ex:
            raise WrongArgumentsException(Err.OA0061, [str(ex)])
        self._sync_user_with_zoho(display_name, email)
        return user

    def delete(self, item_id, **kwargs):
        item = self.get_user_by_id(item_id)
        ignore_permissions = kwargs.pop('ignore_permissions', False)
        if not ignore_permissions:
            token = kwargs.pop('token')
            user = self.get_user(token)
            action_resources = self.get_action_resources(
                token, ['DELETE_USER'])
            if not (check_action(action_resources,
                                 'DELETE_USER', item.type.name, item.scope_id
                                 ) or self._is_self_edit(user, item_id)):
                raise ForbiddenException(Err.OA0012, [])
        item.deleted_at = utcnow().timestamp()
        self.session.add(item)
        self.session.commit()

    def get(self, item_id, **kwargs):
        item = self.session.query(User).filter(
            and_(
                User.id == item_id,
                User.deleted.is_(False))).one_or_none()
        if not item:
            raise NotFoundException(Err.OA0043, [item_id])
        if 'token' in kwargs:
            token = kwargs.pop('token')
            user = self.get_user(token)
            action_resources = self.get_action_resources(token,
                                                         ['LIST_USERS'])
            if not (check_action(action_resources, 'LIST_USERS',
                                 item.type.name, item.scope_id) or
                    self._is_self_edit(user, item_id)):
                raise ForbiddenException(Err.OA0012, [])
        payload = ((item.type.name, item.scope_id),)
        scope_info = self.get_resources_info(payload).get(item.scope_id, {})
        return item, scope_info

    @staticmethod
    def _get_edit_params(**kwargs):
        fields = ['email', 'password', 'display_name', 'is_active',
                  'slack_connected', 'jira_connected']
        return get_input(fields, **kwargs)

    def _check_edit(self, item, token, **input_):
        display_name = input_.get('display_name')
        password = input_.get('password')
        is_active = input_.get('is_active')
        # TODO: check password with validator > ACR-1151
        user = self.get_user(token)
        action_resources = self.get_action_resources(
            token, ['EDIT_USER_INFO', 'ACTIVATE_USER', 'RESET_USER_PASSWORD'])

        param_actions = [(display_name, 'EDIT_USER_INFO'),
                         (is_active, 'ACTIVATE_USER'),
                         (password, 'RESET_USER_PASSWORD')]
        for i in param_actions:
            param, action = i
            if param is not None and not (
                    check_action(action_resources, action, item.type.name,
                                 item.scope_id) or
                    self._is_self_edit(user, item.id)):
                raise ForbiddenException(Err.OA0012, [])

    def edit(self, item_id, **input_):
        token = input_.pop('token')
        self.check_update_restrictions(**input_)
        params = self._get_edit_params(**input_)
        item = self.get_user_by_id(item_id)
        self._check_edit(item, token, **params)
        password = params.get('password')
        display_name = params.get('display_name')
        slack_connected = params.get('slack_connected')
        jira_connected = params.get('jira_connected')
        if password is not None:
            self._check_password(password)
            # change salt on password changing
            new_salt = gen_salt()
            params['salt'] = new_salt
            params['password'] = hash_password(password, new_salt)
            params['is_password_autogenerated'] = False
        if display_name is not None:
            check_string_attribute('display_name', display_name, max_length=64)
        if slack_connected is not None:
            check_bool_attribute('slack_connected', slack_connected)
        if jira_connected is not None:
            check_bool_attribute('jira_connected', jira_connected)
        try:
            if params:
                self.session.query(User).filter_by(id=item_id).update(params)
                self.session.commit()
        except IntegrityError as ex:
            raise WrongArgumentsException(Err.OA0061, [str(ex)])
        return super().get(item_id)

    def check_email(self, email):
        check_string_attribute('email', email)
        if not is_email_format(email):
            raise WrongArgumentsException(Err.OA0044, [])

    def list(self, **kwargs):
        token = kwargs.pop('token')
        action_resources = self.get_action_resources(token, ['LIST_USERS'])
        users_list = super().list(**kwargs)
        queryset = list(filter(
            lambda x: (x.type.name, x.scope_id) in action_resources[
                'LIST_USERS'], users_list))
        payload = list(map(lambda x: (x.type.name, x.scope_id), queryset))
        resources_info = self.get_resources_info(payload)
        return queryset, resources_info

    def get_bulk_users(self, user_ids, **kwargs):
        query = self.session.query(
            self.model_type, func.max(Token.created_at)
        ).outerjoin(
            Token, Token.user_id == self.model_type.id
        ).filter(and_(
            self.model_type.deleted.is_(False),
            self.model_type.id.in_(user_ids)
        )).group_by(
            self.model_type.id
        )
        if len(kwargs) > 0:
            query = query.filter_by(**kwargs)
        result = []
        for user_obj, last_dt in query.all():
            if not user_obj:
                continue
            user = user_obj.to_dict()
            user['last_login'] = int(last_dt.timestamp()) if last_dt else 0
            result.append(user)
        return result


class UserAsyncController(BaseAsyncControllerWrapper):
    def _get_controller_class(self):
        return UserController
