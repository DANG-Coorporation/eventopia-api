import { Request, Response } from "express";
import UserService from "../service/user.service";
import { HttpStatusCode } from "axios";
import { ProcessError } from "../helper/Error/errorHandler";
import { BadRequestException } from "../helper/Error/BadRequestException/BadRequestException";
import { validate } from "../helper/function/validator";
import { postUserValidator } from "../helper/validator/postUser.validator";
import { checkReferralCodeValidator } from "../helper/validator/checkReferralCode";
import { loginValidator } from "../helper/validator/login.validator";
import ReferralLinks from "../database/models/referralLink";
import JwtService from "../service/jwt.service";
import { createByGoogleValidator } from "../helper/validator/createUsersByGoogle";
import { UserAttributes } from "../database/models/user";

export class UserController {
  userServices: UserService;
  jwtService: JwtService;

  constructor() {
    this.userServices = new UserService();
    this.jwtService = new JwtService();
  }

  async paginate(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const users = await this.userServices.page({
        page: Number(page),
        limit: Number(limit),
        data: { ...req.query },
      });
      res.status(HttpStatusCode.Ok).json(users);
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async read(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) throw new BadRequestException("Invalid id", {});
      const user = await this.userServices.getById(id);
      const userObject = user.toJSON();
      res.json(userObject);
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async create(req: Request, res: Response) {
    try {
      await validate(postUserValidator, req.body);
      const user = await this.userServices.create(req.body);
      if (req.body.referralCode) {
        const uplinkUser = await this.userServices.gets({
          uniqueId: req.body.referralCode,
        });
        await ReferralLinks.create({
          upLinkId: uplinkUser[0].id,
          downLinkId: user.id,
        });
      }
      res.json(user.toJSON());
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) throw new BadRequestException("Invalid id", {});
      const user = await this.userServices.updateById(id, req.body);
      res.status(HttpStatusCode.Ok).json(user.toJSON());
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (!id) throw new BadRequestException("Invalid id", {});
      const affectedRows = await this.userServices.deleteById(id);
      res.status(HttpStatusCode.Ok).json({
        affectedRows: affectedRows || 0,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async checkReferralCode(req: Request, res: Response) {
    try {
      const body = await validate<{ referralCode: string }>(
        checkReferralCodeValidator,
        req.body
      );
      await this.userServices.checkReferralCode(body.referralCode);
      res.status(HttpStatusCode.Ok).json({
        message: "Referral code is valid",
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const body = await validate<{ email: string; password: string }>(
        loginValidator,
        req.body
      );
      const user = await this.userServices.login(body.email, body.password);
      res.status(HttpStatusCode.Ok).json(user);
    } catch (error) {
      ProcessError(error, res);
    }
  }

  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new BadRequestException("Invalid token", {});
      }
      const tokenString = token.split(" ")[1];
      console.log("tokenString", tokenString);
      let user;

      try {
        // Try to verify the token using your custom JWT service
        user = await this.userServices.verifyToken(tokenString);
        console.log("user", user);
      } catch (error) {
        // If JWT verification fails, try Firebase token verification
        user = await this.jwtService.verifyFirebaseToken(tokenString);
        console.log("user", user);
      }

      console.log(user);
      res.status(HttpStatusCode.Ok).json(user);
    } catch (error) {
      ProcessError(error, res);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const token = <string>req.headers.authorization;
      if (!token) throw new BadRequestException("Invalid token", {});
      const user = await this.userServices.refreshToken(token.split(" ")[1]);
      res.status(HttpStatusCode.Ok).json(user);
    } catch (error) {
      ProcessError(error, res);
    }
  }

  async createByGoogle(req: Request, res: Response): Promise<void> {
    try {
      const body = await validate<UserAttributes>(
        createByGoogleValidator,
        req.body
      );
      const result = await this.userServices.createByGoogle(body);
      res.status(HttpStatusCode.Ok).json(result);
    } catch (error) {
      ProcessError(error, res);
    }
  }
}
