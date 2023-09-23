import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface CartAttributes {
  id: number;
  userId: number;
  eventId: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartCreationAttributes
  extends Optional<CartAttributes, "id"> {}
export interface CartInterface extends Required<CartAttributes> {}

class Carts
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public userId!: number;
  public eventId!: number;
  public deleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Carts.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN(),
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
    tableName: "carts",
    sequelize: databaseInstance,
  }
);

export default Carts;
