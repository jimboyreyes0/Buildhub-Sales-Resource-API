import { Request, Response, NextFunction } from "express";

export const setHeadersMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

  const requestHeaders = req.headers["access-control-request-headers"];
  res.setHeader("Access-Control-Allow-Headers", requestHeaders ? requestHeaders : "*");

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method === "OPTIONS") {
    res.status(204).end();
  } else {
    next();
  }
};
