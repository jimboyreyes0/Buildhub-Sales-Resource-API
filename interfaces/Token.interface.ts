export default interface IDecodedToken {
  ID: bigint;
  FirstName: string;
  LastName: string;
  iat?: number;
  exp?: number;
}
