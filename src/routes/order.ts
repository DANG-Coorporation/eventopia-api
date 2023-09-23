import { Request, Response, Router } from "express";
import OrderController from "../controllers/order.controller";

export default class OrderRouter {
  router: Router;
  orderController: OrderController;

  constructor() {
    // Initialize controllers objects
    this.orderController = new OrderController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post("/", (req: Request, res: Response) =>
      this.orderController.createOrder(req, res)
    );
  }
}
