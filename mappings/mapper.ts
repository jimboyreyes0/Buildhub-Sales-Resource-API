import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { userProfile } from "./user.profile";
import { ticketProfile } from "./ticket.profile";
import { approvalProfile } from "./approval.profile";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

userProfile(mapper);
ticketProfile(mapper);
approvalProfile(mapper);
