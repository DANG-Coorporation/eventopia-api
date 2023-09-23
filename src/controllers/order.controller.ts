import { Request, Response } from "express";
import { ProcessError } from "../helper/Error/errorHandler";
import OrderService from "../service/order.service";

export default class OrderController {
  orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response) {
    try {
      const result = await this.orderService.createOrder();
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error) {
      ProcessError(error, res);
    }
  }
}
