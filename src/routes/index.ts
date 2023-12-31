import { Request, response, Response, Router } from "express";
import { UserController } from "../controllers/user";
import EventController from "../controllers/event.controller";
import DokuTestController from "../controllers/dokuTest.controller";
import { HttpStatusCode } from "axios";
import { request } from "https";

export default class MainRouter {
  router: Router;
  userController: UserController;
  eventController: EventController;
  testDokuController: DokuTestController;

  constructor() {
    // Initialize controllers objects
    this.userController = new UserController();
    this.eventController = new EventController();
    this.testDokuController = new DokuTestController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.get("/", (req, res) => {
      res.status(HttpStatusCode.Ok).send({
        message: "Status OK",
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

    this.router.post(
      "/users/check/referral-code",
      (req: Request, res: Response) =>
        this.userController.checkReferralCode(req, res)
    );

    this.router
      .route("/event")
      .post((req: Request, res: Response) =>
        this.eventController.create(req, res)
      )
      .get((req: Request, res: Response) =>
        this.eventController.paginate(req, res)
      );

    this.router
      .route("/event/uniq-id/:uniqId")
      .get((req: Request, res: Response) =>
        this.eventController.getEventDetail(req, res)
      );

    this.router
      .route("/event/:id")
      .get((req: Request, res: Response) =>
        this.eventController.getEventById(req, res)
      );

    this.router.post("/test/get-payment-code", (req: Request, res: Response) =>
      this.testDokuController.generatePaymentCode(req, res)
    );
  }
}
