import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

const databaseInstance = Database.database;

export interface ProvinceAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProvinceCreationAttributes
  extends Optional<ProvinceAttributes, "id"> {}
export interface ProvinceInstance extends Required<ProvinceAttributes> {}

class Provinces
  extends Model<ProvinceAttributes, ProvinceCreationAttributes>
  implements ProvinceAttributes
{
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Provinces.init(
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
    tableName: "provinces",
    sequelize: databaseInstance,
  }
);
export default Provinces;
