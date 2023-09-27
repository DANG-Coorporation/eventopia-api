import { Op } from "sequelize";
import Reviews, { ReviewCreationAttributes } from "../database/models/review";
import { BadRequestException } from "../helper/Error/BadRequestException/BadRequestException";
import { removeLimitAndPage } from "../helper/function/filteredData";
import { IPaginate } from "../helper/interface/paginate/paginate.interface";

export default class ReviewService {
  //     2	eventId	int	NULL	NULL	YES	NULL
  // 1	id	int	NULL	NULL	NO	NULL	auto_increment
  // 3	userId	int	NULL	NULL	YES	NULL
  // 4	comment	text	utf8mb4	utf8mb4_0900_ai_ci	YES	NULL
  // 5	rating	int	NULL	NULL	YES	NULL
  // 6	createdAt	datetime	NULL	NULL	NO	CURRENT_TIMESTAMP	DEFAULT_GENERATED
  // 7	updatedAt	datetime	NULL	NULL	NO	CURRENT_TIMESTAMP	DEFAULT_GENERATED

  async create(input: ReviewCreationAttributes) {
    try {
      return await Reviews.create(input);
    } catch (error) {
      throw error;
    }
  }

  async gets(conditions: Partial<ReviewCreationAttributes>) {
    try {
      const reviews = await Reviews.findAll({ where: conditions });
      return reviews;
    } catch (error: any) {
      throw new Error(`Error getting reviews: ${error.message}`);
    }
  }

  async deleteById(id: number) {
    try {
      const review = await Reviews.destroy({ where: { id } });
      if (!review) throw new Error("Review not found");
      return review;
    } catch (error: any) {
      throw error;
    }
  }

  async getById(id: number) {
    try {
      const review = await Reviews.findByPk(id);
      if (!review) throw new Error("Review not found");
      return review;
    } catch (error: any) {
      throw error;
    }
  }

  async updateById(
    id: number,
    input: Partial<ReviewCreationAttributes>
  ): Promise<Reviews> {
    try {
      const review = await Reviews.update(input, { where: { id } });
      if (!review) throw new Error("Review not found");
      const result = await this.getById(id);
      return result;
    } catch (error: any) {
      throw error;
    }
  }

  async page(input: IPaginate<ReviewCreationAttributes>): Promise<any> {
    try {
      const page = input.page ?? 1;
      const limit = input.limit ?? 10;
      const offset = Math.max(page - 1, 0) * limit;
      const conditions = removeLimitAndPage(input.data);
      const reviews = await Reviews.findAndCountAll({
        where: {
          eventId: {
            [Op.eq]: conditions.eventId,
          },
          rating: {
            [Op.eq]: conditions.rating,
          },
          userId: {
            [Op.eq]: conditions.userId,
          },
        },
        limit,
        offset: offset,
        order: [["id", "DESC"]],
      });
      return reviews;
    } catch (error: any) {
      throw new BadRequestException(
        `Error paginating reviews: ${error.message}`
      );
    }
  }
}
