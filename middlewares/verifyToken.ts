import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/apiResponse";
import IDecodedToken from "../interfaces/Token.interface";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      "2369bd4d-f4f6-4cd4-8242-d0727003026f"
    ) as IDecodedToken;

    req.user = {
      ID: decoded.ID,
      FirstName: decoded.FirstName,
      LastName: decoded.LastName,
    };

    next();
  } catch (error) {
    let message = "Invalid token";

    if (error instanceof jwt.TokenExpiredError) {
      message = "Token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      message = "Token is malformed";
    }

    sendResponse(res, { statusCode: 401, success: false, message });
    return res.status(401).json({
      success: false,
      message,
    });
  }
};
