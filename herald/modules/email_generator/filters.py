from typing import Literal

def format_money(
    value: int | float | str,
    currency: str = "$",
    decimal_sep: str = ".",
    thousands_sep: str = ",",
    decimal_digits: int = 2,
    currency_position: Literal["start", "end"] = "end"
) -> str:
    try:
        number = round(float(value), decimal_digits)
        whole_part, frac_part = divmod(abs(number), 1)
        whole_part_str = f"{int(whole_part):,}".replace(",", thousands_sep)

        if decimal_digits > 0:
            frac_str = f"{frac_part:.{decimal_digits}f}"[2:]
            formatted = f"{whole_part_str}{decimal_sep}{frac_str}"
        else:
            formatted = whole_part_str

        if number < 0:
            formatted = f"-{formatted}"

        if currency_position == "start":
            return f"{currency} {formatted}".strip()
        else:
            return f"{formatted} {currency}".strip()

    except (ValueError, TypeError):
        return str(value)
