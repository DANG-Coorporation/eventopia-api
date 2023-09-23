import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface InvoiceNoAttributes {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InvoiceNoCreationAttributes
  extends Optional<InvoiceNoAttributes, "id"> {}
export interface InvoiceNoInstance extends Required<InvoiceNoAttributes> {}

class InvoiceNo
  extends Model<InvoiceNoAttributes, InvoiceNoCreationAttributes>
  implements InvoiceNoAttributes
{
  public id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InvoiceNo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: databaseInstance,
    tableName: "invoiceNo",
  }
);

export default InvoiceNo;
