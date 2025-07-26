import { createMapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { userProfile } from "./user.profile";

export const mapper = createMapper({
  strategyInitializer: classes(),
});

userProfile(mapper);
