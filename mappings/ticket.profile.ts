import {
  createMap,
  MappingProfile,
  forMember,
  mapFrom,
} from "@automapper/core";
import { CreateTicketDto } from "../dto/ticket/create-ticket.dto";
import { TicketEntity } from "../entities/ticket.entity";
import { TicketResponseDto } from "../dto/ticket/ticket-response.dto";
import { UserEntity } from "../entities/user.entity";
import { SafeUserResponseDTO } from "../dto/user/safe-user-response.dto";

export const ticketProfile: MappingProfile = (mapper) => {
  createMap(mapper, CreateTicketDto, TicketEntity);
  createMap(
    mapper,
    TicketEntity,
    TicketResponseDto,
    forMember(
      (dest) => dest._Reporter,
      mapFrom((src) => {
        if (!src._Reporter) return undefined;
        return mapper.map(src._Reporter, UserEntity, SafeUserResponseDTO);
      })
    ),
    forMember(
      (dest) => dest._Assignee,
      mapFrom((src) => {
        if (!src._Assignee) return undefined;
        return mapper.map(src._Assignee, UserEntity, SafeUserResponseDTO);
      })
    )
  );
};
