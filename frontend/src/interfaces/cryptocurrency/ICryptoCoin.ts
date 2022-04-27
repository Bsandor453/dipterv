import ICryptoAllTimeHigh from './ICryptoAllTimeHigh';
import ICryptoLink from './ICryptoLink';
import ICryptoSocial from './ICryptoSocial';

export default interface ICryptoCoin {
  id: number;
  uuid: string;
  slug: string;
  symbol: string;
  name: string;
  description: string;
  color: string;
  iconType: string;
  iconUrl: string;
  websiteUrl: string;
  socials: ICryptoSocial[];
  links: ICryptoLink[];
  confirmedSupply: boolean;
  numberOfMarkets: number;
  numberOfExchanges: number;
  type: string;
  volume: number;
  marketCap: number;
  price: string;
  circulatingSupply: number;
  totalSupply: number;
  approvedSupply: true;
  firstSeen: number;
  listedAt: number;
  change: number;
  rank: number;
  history: string[];
  allTimeHigh: ICryptoAllTimeHigh;
  penalty: boolean;
}
