export default interface IToken {
  username?: string;
  accessToken: string;
  refreshToken: string;
  type: string;
  expiresInSeconds: number;
}
