import { Request, Response } from "express";
import DokuService from "../service/doku.service";
import { ProcessError } from "../helper/Error/errorHandler";

export default class DokuTestController {
  dokuService: DokuService;
  constructor() {
    this.dokuService = new DokuService();
  }

  async generatePaymentCode(req: Request, res: Response) {
    try {
      const result = await this.dokuService.generatePaymentCode();
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error: any) {
      // console.log("error", error["response"]["data"]);
      // console.log("error", error["request"]["_header"]);
      ProcessError(error, res);
    }
  }
}
