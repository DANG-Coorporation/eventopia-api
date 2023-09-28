import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user";

export default class UserRouter {
  router: Router;
  userController: UserController;

  constructor() {
    // Initialize controllers objects
    this.userController = new UserController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post("/register-by-google", (req: Request, res: Response) =>
      this.userController.createByGoogle(req, res)
    );
  }
}
