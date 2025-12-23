class StripeClientBaseException(Exception):
    pass


class PriceNotFound(StripeClientBaseException):
    pass


class CustomerNotFound(StripeClientBaseException):
    pass


class SubscriptionNotFound(StripeClientBaseException):
    pass


class UpdateSubscriptionError(StripeClientBaseException):
    pass


class InvalidWebhookSecret(StripeClientBaseException):
    pass
