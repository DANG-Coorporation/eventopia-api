import { Request, Response } from "express";
import CartService from "../service/cart.service";
import { ProcessError } from "../helper/Error/errorHandler";

export default class CartController {
  cartService: CartService;
  constructor() {
    this.cartService = new CartService();
  }

  async create(req: Request, res: Response) {
    try {
      const result = await this.cartService.create(req.body);
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error: any) {
      ProcessError(error, res);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const result = await this.cartService.page({
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        data: { ...req.query },
      });
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error: any) {
      ProcessError(error, res);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const result = await this.cartService.getById(Number(req.params.id));
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error: any) {
      ProcessError(error, res);
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const result = await this.cartService.updateById(
        Number(req.params.id),
        req.body
      );
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error: any) {
      ProcessError(error, res);
    }
  }

  async deleteById(req: Request, res: Response) {
    try {
      const result = await this.cartService.deleteById(Number(req.params.id));
      res.status(200).json({
        status: 200,
        message: "Success",
        data: result,
      });
    } catch (error: any) {
      ProcessError(error, res);
    }
  }
}
