import express, { Router } from "express";
import TicketsController from "../../controllers/Tickets.controller";
import { verifyToken } from "../../middlewares/verifyToken";

const router: Router = express.Router();
const ticketsController = new TicketsController();

router.post("/", verifyToken, ticketsController.createTicket);
router.get("/", ticketsController.getAllTickets);
router.get("/:id", ticketsController.getTicketById);

export default router;
