import { ParamsDictionary } from "express-serve-static-core";

interface UserParams extends ParamsDictionary {
  id: string;
}