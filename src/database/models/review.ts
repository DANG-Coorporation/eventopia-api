import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface ReviewAttributes {
  id?: number;
  eventId: number;
  userId: number;
  comment: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewCreationAttributes
  extends Optional<ReviewAttributes, "id"> {}
export interface ReviewInstance
  extends Model<ReviewAttributes, ReviewCreationAttributes>,
    ReviewAttributes {}

class Reviews
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public eventId!: number;
  public userId!: number;
  public comment!: string;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Reviews.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT(),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "reviews",
    sequelize: databaseInstance,
  }
);

export default Reviews;
