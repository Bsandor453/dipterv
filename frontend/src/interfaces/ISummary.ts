import IPageable from './IPageable';
import IProfit from './IProfit';

export default interface ISummary {
  depositCount: number;
  purchaseCount: number;
  saleCount: number;
  moneyResetCount: number;
  profit: number;
  totalMoneyDeposited: number;
  moneyInWallet: number;
  totalPurchaseAmount: number;
  totalSaleAmount: number;
  profitOnCryptocurrencyPage: IPageable<IProfit>;
}
