import { Request, Response, Router } from "express";
import CartController from "../controllers/cart.controller";

export default class CartRoute {
  router: Router;
  cartController: CartController;

  constructor() {
    // Initialize controllers objects
    this.cartController = new CartController();

    // Initialize router object
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post("/", (req: Request, res: Response) =>
      this.cartController.create(req, res)
    );

    this.router.get("/", (req: Request, res: Response) =>
      this.cartController.getAll(req, res)
    );

    this.router.get("/:id", (req: Request, res: Response) =>
      this.cartController.getById(req, res)
    );

    this.router.put("/:id", (req: Request, res: Response) =>
      this.cartController.updateById(req, res)
    );

    this.router.delete("/:id", (req: Request, res: Response) =>
      this.cartController.deleteById(req, res)
    );
  }
}
