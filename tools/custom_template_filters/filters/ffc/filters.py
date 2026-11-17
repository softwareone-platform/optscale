def format_money(
    value: int | float | str,
    currency: str = "$",
    decimal_sep: str = ".",
    thousands_sep: str = ",",
    decimal_digits: int = 2,
    currency_position: str = "start"  # 'start' or 'end'
) -> str:
    try:
        number = float(value)
    except (ValueError, TypeError):
        return str(value)

    number = round(number, decimal_digits)

    # Handle sign
    is_negative = number < 0
    number = abs(number)

    # Split integer and decimal parts
    integer_part = int(number)
    decimal_part = round(number - integer_part, decimal_digits)

    # Format integer part with thousands separator
    int_str = f"{integer_part:,}".replace(",", thousands_sep)

    # Format decimal part
    if decimal_digits > 0:
        frac_str = f"{decimal_part:.{decimal_digits}f}"[2:]  # remove leading '0.'
        formatted = f"{int_str}{decimal_sep}{frac_str}"
    else:
        formatted = int_str

    # Restore sign
    if is_negative:
        formatted = f"-{formatted}"

    # Add currency symbol
    if currency_position == "start":
        result = f"{currency} {formatted}"
    else:
        result = f"{formatted} {currency}"

    return result.strip()
