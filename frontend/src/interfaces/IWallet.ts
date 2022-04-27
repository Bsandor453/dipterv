export default interface IWallet {
  referenceCurrency: number;
  cryptocurrencies?: {
    [key: string]: number;
  };
}
