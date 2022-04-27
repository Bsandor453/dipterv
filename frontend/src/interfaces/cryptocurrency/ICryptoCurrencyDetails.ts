import ICryptoBase from './ICryptoBase';
import ICryptoCoin from './ICryptoCoin';

export default interface ICryptoCurrencyDetails {
  base: ICryptoBase;
  coin: ICryptoCoin | null;
}
