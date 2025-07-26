import express, { Router } from "express";
import UsersController from "../../controllers/Users.controller";

const router: Router = express.Router();
const usersController = new UsersController();

router.post("/login", usersController.login);
router.post("/", usersController.createUser);
router.patch("/:id", usersController.updateUser);
router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);
router.delete("/:id", usersController.deleteUser);

export default router;
