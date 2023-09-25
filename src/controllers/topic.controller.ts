import { Request, Response } from "express";
import TopicsService from "../service/topic.service";
import { ProcessError } from "../helper/Error/errorHandler";

const topicsService = new TopicsService();

export default class TopicsController {
  async getAllTopics(req: Request, res: Response): Promise<void> {
    try {
      const topics = await topicsService.getAllTopics();
      res.json(topics);
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
