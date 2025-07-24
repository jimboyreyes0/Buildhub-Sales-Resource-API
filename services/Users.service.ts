import jwt from "jsonwebtoken";
import Users from "../models/Users.model";
import { CreateUserDTO, LoginDTO, UpdateUserDTO } from "../dto/Users.dto";
import { ILogin, IToken } from "../interfaces/Users.interface";

export default class UsersService {
  async login(userData: LoginDTO): Promise<ILogin> {
    const user = await Users.findOne({
      where: {
        Username: userData.Username,
        Password: userData.Password,
      },
    });

    if (!user) throw new Error("Invalid credentials");

    const tokenValue: IToken = {
      ID: user.ID,
      FirstName: user.FirstName,
      LastName: user.LastName,
    };

    const token = await jwt.sign(
      tokenValue,
      "2369bd4d-f4f6-4cd4-8242-d0727003026f",
      {
        expiresIn: "7d",
      }
    );

    const responseData: ILogin = {
      ID: user.ID,
      Token: token,
      FirstName: user.FirstName,
      LastName: user.LastName,
    };

    return responseData;
  }
  async findAll(): Promise<Users[]> {
    return await Users.findAll();
  }

  async findById(id: number): Promise<Users | null> {
    return await Users.findByPk(id);
  }

  async create(userData: CreateUserDTO): Promise<Users> {
    return await Users.create(userData);
  }

  async update(id: number, userData: UpdateUserDTO): Promise<Users | null> {
    const user = await Users.findByPk(id);
    if (!user) return null;

    return await user.update(userData);
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await Users.destroy({ where: { ID: id } });
    return deleted > 0;
  }
}
