import { Request, Response, NextFunction } from "express";

export const versioning = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ENV_VERSION: any = process.env.VERSION || "ENV VERSION ERROR";
  const APP_VERSION: string = "1.0.0";
  const LAST_UPDATED: string = "July 24, 2025 2:00 PM";

  res
    .status(200)
    .json({ success: true, ENV_VERSION, APP_VERSION, LAST_UPDATED });
};
