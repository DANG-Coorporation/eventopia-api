import { Op } from "sequelize";
import User, { UserCreationAttributes } from "../database/models/user";
import { BadRequestException } from "../helper/Error/BadRequestException/BadRequestException";
import { NotFoundException } from "../helper/Error/NotFound/NotFoundException";
import { removeLimitAndPage } from "../helper/function/filteredData";
import { getUniqId } from "../helper/function/getUniqId";
import { IPaginate } from "../helper/interface/paginate/paginate.interface";
import bcrypt from "bcrypt";
import JwtService from "./jwt.service";
export default class UserService {
  jwtService: JwtService;
  constructor() {
    this.jwtService = new JwtService();
  }

  async create(input: UserCreationAttributes) {
    try {
      const isExist = !!(await this.gets({ email: input.email })).length;
      if (isExist) throw new BadRequestException("Email already exist", {});
      const referralCode = getUniqId({
        length: 6,
      });
      const hashPassword = await bcrypt.hash(input.password, 10);
      const user = await User.create({
        ...input,
        uniqueId: referralCode,
        password: hashPassword,
      });
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async createByGoogle(input: UserCreationAttributes) {
    try {
      const isExist = !!(await this.gets({ email: input.email })).length;
      if (isExist) throw new BadRequestException("Email already exist", {});
      const user = await User.create({
        ...input,
        uniqueId: getUniqId({
          length: 6,
        }),
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async gets(conditions: Partial<UserCreationAttributes>) {
    try {
      const users = await User.findAll({ where: conditions });
      return users;
    } catch (error: any) {
      throw new Error(`Error getting users: ${error.message}`);
    }
  }

  async findOne(conditions: Partial<UserCreationAttributes>) {
    try {
      const user = await User.findOne({ where: conditions });
      if (!user) throw new NotFoundException("User not found", {});
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new NotFoundException("User not found", {});
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async deleteById(id: number) {
    try {
      const user = await User.destroy({ where: { id } });
      if (!user) throw new NotFoundException("User not found", {});
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async updateById(
    id: number,
    input: Partial<UserCreationAttributes>
  ): Promise<User> {
    try {
      const user = await User.update(input, { where: { id } });
      if (!user) throw new NotFoundException("User not found", {});
      const result = await this.getById(id);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  async page(input: IPaginate<UserCreationAttributes>) {
    try {
      const page = input.page ?? 1;
      const limit = input.limit ?? 10;
      const offset = Math.max(page - 1, 0) * limit;
      const conditions = removeLimitAndPage(input.data);
      const users = await User.findAndCountAll({
        where: {
          name: {
            [Op.like]: `%${conditions.name ?? ""}%`,
          },
        },
        limit,
        offset: offset,
        order: [["id", "DESC"]],
      });
      return users;
    } catch (error: any) {
      throw new BadRequestException(`Error paginating users: ${error.message}`);
    }
  }

  async checkReferralCode(referralCode: string) {
    try {
      const user = await this.gets({ uniqueId: referralCode });
      if (!user.length)
        throw new NotFoundException("Referral code is invalid!", {});
      return user[0];
    } catch (error: any) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.findOne({ email });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new BadRequestException("Invalid password", {});
      const payload = await this.getPayload(user);
      const accessToken = await this.jwtService.generateToken(payload);
      const refreshToken = await this.jwtService.generateRefreshToken({
        id: user.id,
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      const user = await this.jwtService.verifyToken(token);
      console.log("userxx", user);
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async refreshToken(token: string) {
    try {
      const refreshTokenPayload = await this.jwtService.verifyRefreshToken(
        token
      );

      const user = await this.findOne({ id: refreshTokenPayload.id });
      const accessToken = await this.jwtService.generateToken(
        await this.getPayload(user)
      );
      const refreshToken = await this.jwtService.generateRefreshToken({
        id: user.id,
      });
      return {
        accessToken,
        refreshToken,
      };
    } catch (error: any) {
      throw error;
    }
  }
  async getPayload(user: UserCreationAttributes) {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      return payload;
    } catch (error: any) {
      throw error;
    }
  }
}
