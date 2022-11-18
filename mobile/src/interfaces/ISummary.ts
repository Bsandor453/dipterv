import IPageable from './IPageable';
import IProfit from './IProfit';
import IProfitableCoin from './IProfitableCoin';

export default interface ISummary {
  depositCount: number;
  purchaseCount: number;
  saleCount: number;
  moneyResetCount: number;
  profit: number;
  mostProfitableCoin: IProfitableCoin;
  leastProfitableCoin: IProfitableCoin;
  totalMoneyDeposited: number;
  moneyInWallet: number;
  totalPurchaseAmount: number;
  totalSaleAmount: number;
  profitOnCryptocurrencyPage: IPageable<IProfit>;
}
