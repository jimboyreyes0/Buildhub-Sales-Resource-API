import jwt from "jsonwebtoken";
import Users from "../models/Users.model";
import { ILogin, IToken } from "../interfaces/Users.interface";
import { UserEntity } from "../entities/user.entity";
import { Op } from "sequelize";
import Roles from "../models/Roles.model";
export default class UsersService {
  async login(userData: UserEntity): Promise<ILogin | null> {
    const user = await Users.findOne({
      where: {
        Username: userData.Username,
        Password: userData.Password,
        Status: true,
      },
    });

    if (!user) return null;

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
  async findAll(): Promise<UserEntity[]> {
    return await Users.findAll({
      attributes: {
        exclude: ["Password"],
      },
      where: {
        Status: true,
      },
      include: [
        {
          model: Roles,
          as: "_Role",
        },
      ],
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await Users.findOne({
      where: {
        ID: id,
        Status: true,
      },
      attributes: {
        exclude: ["Password"],
      },
    });
  }

  async create(userEntity: UserEntity): Promise<UserEntity | null> {
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [
          { Username: userEntity.Username },
          { EmailAddress: userEntity.EmailAddress },
        ],
      },
      attributes: {
        exclude: ["Password"],
      },
    });

    if (existingUser) {
      return null;
    }

    const created = await Users.create(userEntity);
    return created.get({ plain: true }) as UserEntity;
  }

  async update(id: number, userData: UserEntity): Promise<UserEntity | null> {
    const user = await Users.findByPk(id);
    if (!user) return null;

    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [
          { Username: userData.Username },
          { EmailAddress: userData.EmailAddress },
        ],
        ID: { [Op.ne]: id },
        Status: true,
      },
    });

    if (existingUser) {
      return null;
    }

    const updated = await user.update(userData);
    return updated.get({ plain: true }) as UserEntity;
  }

  async delete(id: number): Promise<boolean> {
    const [affectedCount] = await Users.update(
      {
        Status: false,
      },
      {
        where: {
          ID: id,
          Status: true,
        },
      }
    );

    return affectedCount > 0;
  }
}
