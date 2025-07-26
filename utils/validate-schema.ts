import { Request, Response, NextFunction } from "express";
import { sendResponse } from "./apiResponse";
import { validate } from "class-validator";
import { BadRequestException } from "../exceptions/http.exception";

export const validateSchema = async (dto: any) => {
  const errors = await validate(dto);
  if (errors.length > 0) {
    throw new BadRequestException(
      errors
        .map((err) => Object.values(err.constraints || {}))
        .flat()
        .join(", ")
    );
  }
};
