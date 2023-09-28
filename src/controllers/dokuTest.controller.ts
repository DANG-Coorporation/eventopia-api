/// <reference path="./custom.d.ts" />
import { Request, Response } from "express";
import DokuService from "../service/doku.service";
import { ProcessError } from "../helper/Error/errorHandler";
import OrderService from "../service/order.service";

export default class DokuTestController {
  dokuService: DokuService;
  orderService: OrderService;
  constructor() {
    this.dokuService = new DokuService();
    this.orderService = new OrderService();
  }

  async generatePaymentCode(req: Request, res: Response) {
    try {
      // const result = await this.orderService.createOrder();
      res.status(200).json({
        status: 200,
        message: "Success",
        data: "result",
      });
    } catch (error: any) {
      ProcessError(error, res);
    }
  }
}
