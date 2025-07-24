import { NextFunction, Request, Response } from "express";
import UsersService from "../services/Users.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/apiResponse";

export default class UsersController {
  private userService = new UsersService();

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { Username, Password } = req.body;
      if (!Username || !Password)
        return sendResponse(res, 400, false, {}, "Invalid credentials.");
    }
  );
  getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userService.findAll();
      sendResponse(res, 200, true, users, "");
    }
  );

  getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      if (isNaN(id))
        return res.status(400).json({ success: false, error: "Invalid ID" });

      const user = await this.userService.findById(id);
      user
        ? sendResponse(res, 200, true, user, "")
        : sendResponse(res, 400, false, {}, "Invalid ID");
    }
  );

  createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await this.userService.create(req.body);
      sendResponse(res, 200, true, newUser, "");
    }
  );

  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return sendResponse(res, 400, false, {}, "Invalid ID");

      const updateUser = await this.userService.update(id, req.body);
      if (!updateUser)
        return sendResponse(res, 400, false, {}, "Invalid request");
      sendResponse(res, 200, true, updateUser, "");
    }
  );
}
