import { Request, Response, Router } from "express";
import ReviewController from "../controllers/reviews.controller";

export default class ReviewRouter {
  router: Router;
  reviewController: ReviewController;

  constructor() {
    // Initialize controllers objects
    this.reviewController = new ReviewController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post("/", (req: Request, res: Response) =>
      this.reviewController.create(req, res)
    );

    this.router.get("/", (req: Request, res: Response) =>
      this.reviewController.getAll(req, res)
    );

    this.router.get("/:id", (req: Request, res: Response) =>
      this.reviewController.getById(req, res)
    );
  }
}
