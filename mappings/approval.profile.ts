import { createMap, MappingProfile } from "@automapper/core";
import { ApprovalEntity } from "../entities/approval.entity";
import { ApprovalResponseDTO } from "../dto/approval/approval-response.dto";

export const approvalProfile: MappingProfile = (mapper) => {
  createMap(mapper, ApprovalEntity, ApprovalResponseDTO);
};
