import express, { Router } from "express";
const router: Router = express.Router();

import { versioning } from "../utils/version";
import usersRouter from "./sub-routes/users.router";
import rolesRouter from "./sub-routes/roles.router";
import ticketsRouter from "./sub-routes/tickets.router";

router.get("/version", versioning);
router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/tickets", ticketsRouter);

export default router;
