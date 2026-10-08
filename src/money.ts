export type Line = { amount: number };

// ISO 4217 currencies that use 3 decimal places
const THREE_DECIMAL_CURRENCIES = new Set([
  'BHD',
  'IQD',
  'JOD',
  'KWD',
  'LYD',
  'OMR',
  'TND',
]);

// ISO 4217 currencies that use 0 decimal places
const ZERO_DECIMAL_CURRENCIES = new Set([
  'BIF',
  'CLP',
  'DJF',
  'GNF',
  'ISK',
  'JPY',
  'KMF',
  'KRW',
  'PYG',
  'RWF',
  'UGX',
  'UYI',
  'VND',
  'VUV',
  'XAF',
  'XOF',
  'XPF',
]);

function getDecimalPlaces(currency: string): number {
  if (THREE_DECIMAL_CURRENCIES.has(currency)) {
    return 3;
  }
  if (ZERO_DECIMAL_CURRENCIES.has(currency)) {
    return 0;
  }
  return 2;
}

/**
 * Round a value to the given number of decimal places and return it as a
 * string.  A small epsilon correction is applied before rounding so that
 * floating-point representation errors do not cause values that should round
 * up (e.g. 1.005, which is internally stored as 1.00499999…) to round down.
 */
function roundAndFormat(value: number, decimals: number): string {
  const factor = Math.pow(10, decimals);
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;
  return rounded.toFixed(decimals);
}

export function formatTotal(lines: Line[], currency: string): string {
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  const decimals = getDecimalPlaces(currency);
  return roundAndFormat(sum, decimals);
}
