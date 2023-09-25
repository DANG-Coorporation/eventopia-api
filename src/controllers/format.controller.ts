import { Request, Response } from "express";
import FormatsService from "../service/format.service";
import { ProcessError } from "../helper/Error/errorHandler";
import Topics from "../database/models/topic";

const formatsService = new FormatsService();

export default class FormatsController {
  async getAllFormat(req: Request, res: Response): Promise<void> {
    try {
      const format = await formatsService.getAllFormat();
      res.json(format);
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
