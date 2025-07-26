import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      ID: bigint;
      FirstName: string;
      LastName: string;
    };
  }
}
