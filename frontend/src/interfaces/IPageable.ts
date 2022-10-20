export default interface IPageable<T> {
  content: T[];
  currentPage: number;
  pageCount: number;
  elementCount: number;
}
