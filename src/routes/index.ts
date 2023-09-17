import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user";
import EventController from "../controllers/event.controller";

export default class MainRouter {
  router: Router;
  userController: UserController;
  eventController: EventController;

  constructor() {
    // Initialize controllers objects
    this.userController = new UserController();
    this.eventController = new EventController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.get("/", (req, res) => {
      res.json({
        message: "Welcome to the API",
      });
    });

    this.router
      .route("/users/:id")
      .get((req: Request, res: Response) => this.userController.read(req, res))
      .put((req: Request, res: Response) =>
        this.userController.update(req, res)
      )
      .delete((req: Request, res: Response) =>
        this.userController.delete(req, res)
      );

    this.router
      .route("/users")
      .get((req: Request, res: Response) =>
        this.userController.paginate(req, res)
      )
      .post((req: Request, res: Response) =>
        this.userController.create(req, res)
      );

    this.router.post("/check/referral-code", (req: Request, res: Response) =>
      this.userController.checkReferralCode(req, res)
    );

    this.router
      .route("/event")
      .post((req: Request, res: Response) =>
        this.eventController.create(req, res)
      );
  }
}
