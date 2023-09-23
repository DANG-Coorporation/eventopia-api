import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface PaymentAttributes {
  id?: number;
  name: string;
  paymentCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentCreationAttributes
  extends Optional<PaymentAttributes, "id"> {}
export interface PaymentInstance extends Required<PaymentAttributes> {}

class Payments
  extends Model<PaymentAttributes, PaymentCreationAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public name!: string;
  public paymentCode!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payments.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    paymentCode: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "payments",
    sequelize: databaseInstance,
  }
);

export default Payments;
