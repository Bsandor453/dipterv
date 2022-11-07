export default interface ITransaction {
  date: string;
  type: 'BUY_CRYPTOCURRENCY' | 'SELL_CRYPTOCURRENCY' | 'DEPOSIT_MONEY' | 'RESET_MONEY';
  cryptocurrencyId: string;
  price: number;
  amount: number;
  priceTotal: number;
}
