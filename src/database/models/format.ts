import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface FormatAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FormatCreationAttributes
  extends Optional<FormatAttributes, "id"> {}
export interface FormatInstance extends Required<FormatCreationAttributes> {}

class Formats
  extends Model<FormatAttributes, FormatCreationAttributes>
  implements FormatAttributes
{
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Formats.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(),
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
    tableName: "formats",
    sequelize: databaseInstance,
  }
);
export default Formats;
