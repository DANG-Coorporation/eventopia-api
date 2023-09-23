import { Request, Response } from "express";
import { ProcessError } from "../helper/Error/errorHandler";
import OrderService, { ICreateOrder } from "../service/order.service";
import { validate } from "../helper/function/validator";
import { postOrderValidator } from "../helper/validator/createOrder.validator";

export default class OrderController {
  orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  async createOrder(req: Request, res: Response) {
    try {
      const body = await validate<ICreateOrder>(postOrderValidator, req.body);
      const result = await this.orderService.createOrder(body);
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
