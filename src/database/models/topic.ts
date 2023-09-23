import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface TopicAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TopicCreationAtributes
  extends Optional<TopicAttributes, "id"> {}
export interface TopicInstance extends Required<TopicAttributes> {}

class Topics
  extends Model<TopicAttributes, TopicCreationAtributes>
  implements TopicAttributes
{
  public id!: number;
  public name!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Topics.init(
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
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "topics",
    sequelize: databaseInstance,
  }
);

export default Topics;
