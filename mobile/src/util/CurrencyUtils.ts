import { formatCurrency as format } from '@coingecko/cryptoformat';
import config from '../config/MainConfig';

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

  return formatted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
