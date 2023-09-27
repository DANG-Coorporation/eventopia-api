/// <reference path="./custom.d.ts" />

import { Request, Response } from "express";
import ReviewService from "../service/review.service";
import { ProcessError } from "../helper/Error/errorHandler";

export default class ReviewController {
  reviewService: ReviewService;

  constructor() {
    this.reviewService = new ReviewService();
  }

  async create(req: Request, res: Response) {
    try {
      const result = await this.reviewService.create(req.body);
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
      const result = await this.reviewService.page({
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
      const result = await this.reviewService.getById(Number(req.params.id));
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
      const result = await this.reviewService.deleteById(Number(req.params.id));
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
      const result = await this.reviewService.updateById(
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
}
