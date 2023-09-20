import { HttpStatusCode } from "axios";
import { EventAttributes } from "../database/models/event";
import { validate } from "../helper/function/validator";
import { postEventValidator } from "../helper/validator/postEvent";
import EventService from "../service/event.service";
import { Request, Response } from "express";
import { ProcessError } from "../helper/Error/errorHandler";

export default class EventController {
  eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }

  async create(req: Request, res: Response) {
    try {
      const body = await validate<EventAttributes>(
        postEventValidator,
        req.body
      );
      const event = await this.eventService.create(body);
      res.status(HttpStatusCode.Ok).send(event);
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
