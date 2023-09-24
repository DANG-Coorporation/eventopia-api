import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

const databaseInstance = Database.database;

export interface OrderAttributes {
  id?: number;
  invoiceNo: string;
  userId: number;
  eventId: number;
  eventTicketId: number;
  paymentMethod: string;
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
  public invoiceNo!: string;
  public userId!: number;
  public eventId!: number;
  public eventTicketId!: number;
  public paymentMethod!: string;
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
    invoiceNo: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    paymentMethod: {
      type: DataTypes.STRING(),
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
