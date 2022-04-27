export default interface ICryptoCoinHistory {
  change: number;
  history: { price: number; timestamp: number }[];
}
