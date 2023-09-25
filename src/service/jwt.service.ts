import * as jwt from "jsonwebtoken";
import configConstants from "../config/constants";
import { ForbiddenException } from "../helper/Error/Forbidden/ForbiddenException";
import admin from "firebase-admin";
import Users from "../database/models/user";
import { firebaseAdmin } from "../middleware/auth.middleware";
const serviceAccount = require("../../eventopia-jcwdol-011-firebase-adminsdk-5yqm4-618f9fc9af.json");
interface refreshTokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default class JwtService {
  async generateToken(payload: any) {
    return jwt.sign(payload, configConstants.JWT_SECRET_ACCESS_TOKEN, {
      expiresIn: "8h",
    });
  }

  async generateRefreshToken(payload: any) {
    return jwt.sign(payload, configConstants.JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: "7d",
    });
  }

  async verifyToken(token: string) {
    try {
      return jwt.verify(token, configConstants.JWT_SECRET_ACCESS_TOKEN);
    } catch (error) {
      console.log("JwtService:verifyToken:error");
      throw new ForbiddenException("Invalid token", {});
    }
  }

  async verifyFirebaseToken(token: string) {
    console.log("verifyFirebaseToken", token);
    const decodedFirebase = await firebaseAdmin.auth().verifyIdToken(token);
    const uid = decodedFirebase.uid;
    const user = await Users.findOne({
      where: {
        googleUid: uid,
      },
    });
    if (!user) {
      throw new ForbiddenException("Invalid token", {});
    }
    return user.toJSON();
  }

  async verifyRefreshToken(token: string) {
    try {
      return jwt.verify(
        token,
        configConstants.JWT_SECRET_REFRESH_TOKEN
      ) as refreshTokenPayload;
    } catch (error) {
      throw new ForbiddenException("Invalid token", {});
    }
  }
}
