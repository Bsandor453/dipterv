export default interface IPageable<T> {
  transactions: T[];
  currentPage: number;
  pageCount: number;
  elementCount: number;
}
