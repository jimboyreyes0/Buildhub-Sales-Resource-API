import IRoles from "../interfaces/Roles.interface";
import Roles from "../models/Roles.model";

export default class RolesService {
  async findAll(): Promise<IRoles[]> {
    return await Roles.findAll({
      where: {
        Status: true,
      },
    });
  }
}
