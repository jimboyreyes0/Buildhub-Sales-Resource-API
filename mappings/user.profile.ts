import { createMap, MappingProfile } from "@automapper/core";

import { CreateUserDTO } from "../dto/user/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { UserResponseDTO } from "../dto/user/user-response.dto";
import { LoginUserDTO } from "../dto/user/login-user.dto";
import { UpdateUserDTO } from "../dto/user/update-user.dto";
import { SafeUserResponseDTO } from "../dto/user/safe-user-response.dto";

export const userProfile: MappingProfile = (mapper) => {
  createMap(mapper, CreateUserDTO, UserEntity);
  createMap(mapper, UpdateUserDTO, UserEntity);
  createMap(mapper, LoginUserDTO, UserEntity);
  createMap(mapper, UserEntity, UserResponseDTO);
  createMap(mapper, UserEntity, SafeUserResponseDTO);
};
