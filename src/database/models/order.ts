import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface OrderAttributes {
  id?: number;
  userId: number;
  eventId: number;
  eventTicketId: number;
  paymentMethodId: number;
  paymentStatus: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderCreationAttributes
  extends Optional<OrderAttributes, "id"> {}
export interface OrderInstance extends Required<OrderAttributes> {}
// Sequelize Model
class Orders
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public eventId!: number;
  public eventTicketId!: number;
  public paymentMethodId!: number;
  public paymentStatus!: string;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Orders.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(),
    },
    userId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    eventId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    eventTicketId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    paymentMethodId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE(),
    },
  },
  {
    tableName: "orders",
    sequelize: databaseInstance,
  }
);

export default Orders;
