import { Request, Response, NextFunction } from "express";
import { sendResponse } from "./apiResponse";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return sendResponse(res, 400, false, {}, "Invalid ID format");
  }
  next();
};
