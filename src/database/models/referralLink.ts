import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

const databaseInstance = Database.database;

export interface ReferralLinkAttributes {
  id: number;
  upLinkId: number;
  downLinkId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReferralLinkCreationAttributes
  extends Optional<ReferralLinkAttributes, "id"> {}
export interface ReferralLinkInstance
  extends Required<ReferralLinkAttributes> {}

class ReferralLinks
  extends Model<ReferralLinkAttributes, ReferralLinkCreationAttributes>
  implements ReferralLinkAttributes
{
  public id!: number;
  public upLinkId!: number;
  public downLinkId!: number;
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
    upLinkId: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    downLinkId: {
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
