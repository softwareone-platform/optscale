from typing import Annotated

import pycountry
from pydantic import Field, field_validator

from app.schemas.core import BaseSchema, IdSchema

EXCLUDED_CURRENCIES = [
    "XAU",  # gold
    "XAG",  # silver
    "XPD",  # palladium
    "XPT",  # platinum
    "XBA",  # European Composite Unit (EURCO) (bond market unit)
    "XBB",  # European Monetary Unit (E.M.U.-6) (bond market unit)
    "XBC",  # European Unit of Account 9 (E.U.A.-9) (bond market unit)
    "XBD",  # European Unit of Account 17 (E.U.A.-17) (bond market unit)
    "XDR",  # Special drawing rights (International Monetary Fund)
    "XSU",  # Unified System for Regional Compensation (SUCRE)
    "XTS",  # reserved for testign
    "XXX",  # No currency
]


class OrganizationBase(BaseSchema):
    name: Annotated[str, Field(min_length=1, max_length=255, examples=["Red Hat"])]
    is_demo: Annotated[bool, Field(examples=[False])]
    currency: Annotated[str, Field(min_length=3, max_length=3, examples=["USD"])]
    disabled: Annotated[bool, Field(examples=[False])]

    @field_validator("currency", )
    @classmethod
    def validate_currency(cls, currency: str) -> str:
        if currency and (
            currency in EXCLUDED_CURRENCIES or not pycountry.currencies.get(alpha_3=currency)
        ):
            raise ValueError(f"Invalid iso4217 currency code: {currency}.")
        return currency


class OrganizationRead(IdSchema, OrganizationBase):
    pass
