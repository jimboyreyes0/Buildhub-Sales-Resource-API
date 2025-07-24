import { Response } from "express";

type ResponseData = {
  results?: number;
  data?: any;
  message?: string;
  [key: string]: any;
};

export const sendResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  data?: ResponseData,
  message?: string
) => {
  res.status(statusCode).json({
    success,
    message: message || (success ? "Operation successful" : "Operation failed"),
    ...data,
  });
};
