import { NextFunction, Request, Response } from "express";
import RolesService from "../services/Roles.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/apiResponse";

export default class RolesController {
  private roleService = new RolesService();

  getAllRoles = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const roles = await this.roleService.findAll();
      sendResponse(res, { statusCode: 200, data: roles, meta: {} });
    }
  );
}

