import { formatCurrency as format } from '@coingecko/cryptoformat';
import config from '../config/MainConfig';

function numberWithCommas(n) {
  var parts = n.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
}

export const formatCurrency = (
  currency: number,
  toFixed?: number,
  isCurrency = true
) => {
  let formatted = format(
    currency,
    config.defaults.baseCurrency.symbol,
    config.defaults.localeShort
  );

  if (formatted.length > 20) {
    formatted =
      currency.toFixed(toFixed ?? 3) +
      ' ' +
      config.defaults.baseCurrency.symbol;
  }

  // Don't add thousand separator for numbers lower than one absolute value
  if (
    Math.abs(
      Number(
        formatted.slice(-1) === config.defaults.baseCurrency.symbol
          ? formatted.slice(0, -2)
          : formatted
      )
    ) < 1
  ) {
    return formatted;
  }

  if (!isCurrency) {
    formatted = formatted.slice(0, -2);
  }

  return numberWithCommas(formatted);
};

export const formatAmount = (amount: number) => {
  const fractionPart = amount - Math.floor(amount);
  let formatted = '?';
  if (fractionPart !== 0) {
    for (let i = 0; i < 10; ++i) {
      if (fractionPart > Math.pow(10, -i)) {
        formatted = amount.toFixed(i + 3);
        break;
      }
    }
  } else {
    formatted = amount.toFixed(2);
  }
  return formatted;
};
