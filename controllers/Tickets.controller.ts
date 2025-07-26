import { NextFunction, Request, Response } from "express";
import TicketsService from "../services/Tickets.service";
import catchAsync from "../utils/catchAsync";
import { sendResponse } from "../utils/apiResponse";
import { mapper } from "../mappings/mapper";
import { CreateTicketDto } from "../dto/ticket/create-ticket.dto";
import { plainToInstance } from "class-transformer";
import { BadRequestException } from "../exceptions/http.exception";
import { validateSchema } from "../utils/validate-schema";
import { TicketEntity } from "../entities/ticket.entity";
import { TicketResponseDto } from "../dto/ticket/ticket-response.dto";

export default class TicketsController {
  private ticketService = new TicketsService();

  createTicket = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const dto = plainToInstance(CreateTicketDto, req.body);
      dto.Reporter = req.user.ID;
      await validateSchema(dto);

      const ticketEntity = mapper.map(dto, CreateTicketDto, TicketEntity);
      const createdTicket = await this.ticketService.createTicket(ticketEntity);

      if (!createdTicket) throw new BadRequestException();

      sendResponse(res, { statusCode: 201, data: createdTicket, meta: {} });
    }
  );
  getAllTickets = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tickets = await this.ticketService.findAll();
      const ticketDtos = mapper.mapArray(
        tickets,
        TicketEntity,
        TicketResponseDto
      );

      sendResponse(res, { statusCode: 200, data: ticketDtos, meta: {} });
    }
  );
  getTicketById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      if (isNaN(id))
        return sendResponse(res, { statusCode: 400, message: "Invalid ID." });

      const ticket = await this.ticketService.findById(BigInt(id));

      const ticketDto = mapper.map(ticket, TicketEntity, TicketResponseDto);
      ticket
        ? sendResponse(res, { statusCode: 200, data: ticketDto, meta: {} })
        : sendResponse(res, { statusCode: 400, message: "Invalid ticket." });
    }
  );
}
