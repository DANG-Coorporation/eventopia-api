import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

const databaseInstance = Database.database;

export interface PersonOrdersAttributes {
  id?: number;
  orderId: number;
  name: string;
  email: string;
  phoneNumber: string;
  identityNumber?: string;
  dob?: string;
  gender?: Gender;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PersonOrdersCreationAttributes
  extends Optional<PersonOrdersAttributes, "id"> {}
export interface PersonOrdersInstance
  extends Required<PersonOrdersAttributes> {}

class PersonOrders
  extends Model<PersonOrdersAttributes, PersonOrdersCreationAttributes>
  implements PersonOrdersAttributes
{
  public id!: number;
  public orderId!: number;
  public name!: string;
  public email!: string;
  public phoneNumber!: string;
  public identityNumber!: string;
  public dob!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

type Gender = "male" | "female";
PersonOrders.init(
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    phoneNumber: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    identityNumber: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    dob: {
      type: new DataTypes.DATE(),
      allowNull: true,
    },
    gender: {
      type: new DataTypes.ENUM("male", "female"),
      allowNull: true,
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
    tableName: "personOrders",
    sequelize: databaseInstance,
  }
);

export default PersonOrders;
