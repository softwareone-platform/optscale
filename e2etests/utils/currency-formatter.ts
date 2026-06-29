/**
 * Formats a number as a currency string.
 *
 * @param {number} amount - The numeric amount to format.
 * @param {string} [currencySymbol='$'] - The symbol to prefix the formatted currency string (default is '$').
 * @param {string} [locale='en-US'] - The locale string to use for formatting (default is 'en-US').
 * @returns {string} The formatted currency string, prefixed with the specified currency symbol.
 */
export function formatCurrency(amount: number, currencySymbol: string = '$', locale: string = 'en-US'): string {
  return `${currencySymbol}${amount.toLocaleString(locale)}`;
}
