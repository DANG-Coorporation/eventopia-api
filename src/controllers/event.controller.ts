/// <reference path="custom.d.ts" />

import { HttpStatusCode } from "axios";
import { EventAttributes } from "../database/models/event";
import { validate } from "../helper/function/validator";
import { postEventValidator } from "../helper/validator/postEvent";
import EventService from "../service/event.service";
import { Request, Response } from "express";

import { ProcessError } from "../helper/Error/errorHandler";

interface EventTickets {
  name: string;
  description: string;
  type: string;
  price: number;
  quantity: number;
}

interface IEvent extends EventAttributes {
  eventTickets: EventTickets[];
}

export default class EventController {
  eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }

  async create(req: Request, res: Response) {
    try {
      const body = await validate<IEvent>(postEventValidator, req.body);
      const event = await this.eventService.create(body);
      const eventId = event.id as number;
      for (const eventTicket of body.eventTickets) {
        await this.eventService.createTicket(eventId, eventTicket);
      }
      res.status(HttpStatusCode.Ok).send(event);
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async paginate(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, name, provinceId, cityId } = req.query;
      const events = await this.eventService.page({
        page: Number(page),
        limit: Number(limit),
        data: {
          name: name as string | undefined,
          provinceId: provinceId as number | undefined,
          cityId: cityId as number | undefined,
        },
      });
      res.json({
        statusCode: 200,
        message: "success",
        data: events,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async getEventById(req: Request, res: Response): Promise<void> {
    try {
      const eventId = parseInt(req.params.id, 10); // Ambil ID dari parameter URL
      const event = await this.eventService.getEventById(eventId);

      if (!event) {
        res.status(404).json({ message: "Event not found" });
        return;
      }

      res.json({
        statusCode: 200,
        message: "success",
        data: event,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async getEventDetail(req: Request, res: Response) {
    try {
      const { uniqId } = req.params;

      // Panggil service untuk mendapatkan detail acara
      const event = await this.eventService.getEventDetailByUniqId(uniqId);

      // Kirim detail acara sebagai respons
      res.json({
        statusCode: 200,
        message: "success",
        data: event,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
