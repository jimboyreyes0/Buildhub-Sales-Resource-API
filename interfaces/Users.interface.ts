export interface IUsers {
  ID?: number;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  Role: number;
  Username: string;
  Password: string;
  Status: boolean;
}

export interface ILogin {
  ID?: bigint;
  Token?: string;
  FirstName?: string;
  LastName?: string;
}

export interface IToken {
  ID?: bigint;
  FirstName?: string;
  LastName?: string;
}