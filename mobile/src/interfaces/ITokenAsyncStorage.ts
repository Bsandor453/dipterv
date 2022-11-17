import IToken from './IToken';

export default interface IUserAsyncStorage {
  token: IToken;
  token_valid_since: Date;
  token_expires_at: Date;
}
