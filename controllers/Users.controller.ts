import { NextFunction, Request, Response } from "express";
import UsersService from "../services/Users.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/apiResponse";
import { ILogin } from "../interfaces/Users.interface";
import { UserEntity } from "../entities/user.entity";
import { mapper } from "../mappings/mapper";

import { CreateUserDTO } from "../dto/user/create-user.dto";
import { UpdateUserDTO } from "../dto/user/update-user.dto";
import { UserResponseDTO } from "../dto/user/user-response.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "../exceptions/http.exception";
import { LoginUserDTO } from "../dto/user/login-user.dto";
import { validateSchema } from "../utils/validate-schema";
export default class UsersController {
  private userService = new UsersService();

  login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const dto = plainToInstance(LoginUserDTO, req.body);
      await validateSchema(dto);
      const userEntity = mapper.map(req.body, LoginUserDTO, UserEntity);
      const userLogin = await this.userService.login(userEntity);

      if (!userLogin)
        return sendResponse(res, {
          statusCode: 400,
          message: "Invalid credentials.",
        });

      sendResponse(res, { statusCode: 200, data: userLogin, meta: {} });
    }
  );
  getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userService.findAll();
      sendResponse(res, { statusCode: 200, data: users, meta: {} });
    }
  );

  getUserById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      if (isNaN(id))
        return sendResponse(res, { statusCode: 400, message: "Invalid ID." });

      const user = await this.userService.findById(id);
      user
        ? sendResponse(res, { statusCode: 200, data: user, meta: {} })
        : sendResponse(res, { statusCode: 400, message: "Invalid user." });
    }
  );

  createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const dto = plainToInstance(CreateUserDTO, req.body);
      await validateSchema(dto);

      const userEntity = mapper.map(req.body, CreateUserDTO, UserEntity);
      const createdUser = await this.userService.create(userEntity);

      if (!createdUser)
        throw new BadRequestException("Invalid username or email.");

      const user = new UserEntity();
      Object.assign(user, createdUser);
      const response = mapper.map(user, UserEntity, UserResponseDTO);

      sendResponse(res, { statusCode: 201, data: response, meta: {} });
    }
  );

  updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      if (isNaN(id))
        return sendResponse(res, { statusCode: 400, message: "Invalid ID." });

      const dto = plainToInstance(UpdateUserDTO, req.body);
      await validateSchema(dto);

      const userEntity = mapper.map(req.body, UpdateUserDTO, UserEntity);
      const updateUser = await this.userService.update(id, userEntity);
      if (!updateUser) throw new BadRequestException("Invalid user.");
      const user = new UserEntity();
      Object.assign(user, updateUser);
      const response = mapper.map(user, UserEntity, UserResponseDTO);
      sendResponse(res, { statusCode: 200, data: response, meta: {} });
    }
  );

  deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      if (isNaN(id))
        return sendResponse(res, { statusCode: 400, message: "Invalid ID." });

      const deleteOp = await this.userService.delete(id);
      if (!deleteOp) throw new BadRequestException("Invalid user.");
      sendResponse(res, {
        statusCode: 204,
        message: "User deleted successfully",
      });
    }
  );
}
