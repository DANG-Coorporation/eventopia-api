import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

const databaseInstance = Database.database;

export interface ReferralLinkAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReferralLinkCreationAttributes
  extends Optional<ReferralLinkAttributes, "id"> {}
export interface ProviceInstance extends Required<ReferralLinkAttributes> {}

class ReferralLinks
  extends Model<ReferralLinkAttributes, ReferralLinkCreationAttributes>
  implements ReferralLinkAttributes
{
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ReferralLinks.init(
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
    tableName: "referralLinks",
    sequelize: databaseInstance,
  }
);
export default ReferralLinks;
