import { Router } from "express";
import ExternalController from "../controllers/external.controller";

export default class ExternalRouter {
  router: Router;
  ExternalController: ExternalController;
  constructor() {
    // Initialize controllers objects
    this.ExternalController = new ExternalController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post("/doku-payment-notification", (req, res) =>
      this.ExternalController.paymentNotification(req, res)
    );
  }
}
