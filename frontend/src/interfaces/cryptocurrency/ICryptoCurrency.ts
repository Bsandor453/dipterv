import ICryptoBase from './ICryptoBase';
import ICryptoCoin from './ICryptoCoin';
import ICryptoStats from './ICryptoStats';

export default interface ICryptoCurrency {
  stats: ICryptoStats | null;
  base: ICryptoBase;
  coins: ICryptoCoin[] | null;
}
