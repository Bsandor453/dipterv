export default interface IUser {
  userName: string | '';
  fullName: string | '';
  roles?: string[] | null;
  email: string | '';
  password?: string | null;
}
