import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user";

export default class AuthRouter {
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
    this.router.post("/login", (req: Request, res: Response) =>
      this.userController.login(req, res)
    );
    this.router.post("/check-token", (req: Request, res: Response) =>
      this.userController.verifyToken(req, res)
    );
    this.router.post("/refresh-token", (req: Request, res: Response) =>
      this.userController.refreshToken(req, res)
    );
  }
}
