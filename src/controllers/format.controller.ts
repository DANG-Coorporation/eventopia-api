import { Request, Response } from "express";
import FormatsService from "../service/format.service";
import { ProcessError } from "../helper/Error/errorHandler";
import Topics from "../database/models/topic";
import { HttpStatusCode } from "axios";

const formatsService = new FormatsService();

export default class FormatsController {
  async getAllFormat(req: Request, res: Response): Promise<void> {
    try {
      const format = await formatsService.getAllFormat();
      res.status(HttpStatusCode.Ok).json({
        statusCode: HttpStatusCode.Ok,
        message: "Success",
        data: format,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
