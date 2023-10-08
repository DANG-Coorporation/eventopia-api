import { Op } from "sequelize";
import Carts, { CartCreationAttributes } from "../database/models/cart";
import { removeLimitAndPage } from "../helper/function/filteredData";
import { IPaginate } from "../helper/interface/paginate/paginate.interface";
import { BadRequestException } from "../helper/Error/BadRequestException/BadRequestException";

export default class CartService {
  async create(input: CartCreationAttributes) {
    try {
      return await Carts.create({...input,deleted:false});
    } catch (error) {
      throw error;
    }
  }

  async gets(conditions: Partial<CartCreationAttributes>) {
    try {
      const carts = await Carts.findAll({ where: conditions });
      return carts;
    } catch (error: any) {
      throw new Error(`Error getting carts: ${error.message}`);
    }
  }

  async deleteById(id: number) {
    try {
      const cart = await Carts.destroy({ where: { id } });
      if (!cart) throw new Error("Cart not found");
      return cart;
    } catch (error: any) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const cart = await Carts.findByPk(id);
      if (!cart) throw new Error("Cart not found");
      return cart;
    } catch (error: any) {
      throw error;
    }
  }

  async getByUserId(userId: number) {
    try {
      const cart = await Carts.findAll({ where: { userId } });
      if (!cart) throw new Error("Cart not found");
      return cart;
    } catch (error: any) {
      throw error;
    }
  }

  async updateById(
    id: number,
    input: Partial<CartCreationAttributes>
  ): Promise<Carts> {
    try {
      const cart = await Carts.update(input, { where: { id } });
      if (!cart) throw new Error("Cart not found");
      const result = await this.getById(id);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  async page(input: IPaginate<CartCreationAttributes>): Promise<any> {
    try {
      const page = input.page ?? 1;
      const limit = input.limit ?? 10;
      const offset = Math.max(page - 1, 0) * limit;
      const conditions = removeLimitAndPage(input.data);
      const carts = await Carts.findAndCountAll({
        where: {
          userId: {
            [Op.eq]: conditions.userId,
          },
          eventId: {
            [Op.eq]: conditions.eventId,
          },
        },
        limit,
        offset: offset,
        order: [["id", "DESC"]],
      });
      return carts;
    } catch (error: any) {
      throw new BadRequestException(`Error paginating carts: ${error.message}`);
    }
  }
}
