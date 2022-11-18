import ICryptocurrencyHistoryData from './ICryptocurrencyHistoryData';

export default interface ICryptocurrencyHistory {
  id: string;
  history_24h: ICryptocurrencyHistoryData[];
  history_7d: ICryptocurrencyHistoryData[];
  history_30d: ICryptocurrencyHistoryData[];
  history_1y: ICryptocurrencyHistoryData[];
  history_max: ICryptocurrencyHistoryData[];
}
