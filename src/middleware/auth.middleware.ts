import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../helper/Error/UnauthorizedException/UnauthorizedException";
import { ProcessError } from "../helper/Error/errorHandler";
import JwtService from "../service/jwt.service";

export default class AuthMiddleware {
  public async checkAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const bypassAuth = ["/external", "/auth", "/master-data", "/users"];
      for (let whitelist of bypassAuth) {
        if (req.path.startsWith(whitelist)) {
          return next();
        }
      }
      if (req.path === "/") {
        return next();
      }
      if (!req.headers.authorization)
        throw new UnauthorizedException("Unauthorized", {});

      const token = req.headers.authorization.split(" ")[1];
      const jwtService = new JwtService();
      const decoded = await jwtService.verifyToken(token);
      req.user = decoded;
      next();
    } catch (error) {
      ProcessError(error, res);
    }
  }
}
