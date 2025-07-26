import express, { Router } from "express";
import RolesController from "../../controllers/Roles.controller";

const router: Router = express.Router();
const rolesController = new RolesController();

router.get("/", rolesController.getAllRoles);

export default router;
