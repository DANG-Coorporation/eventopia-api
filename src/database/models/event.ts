import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

let databaseInstance = new Database().database;

export interface EventAttributes {
  id?: number;
  name: string;
  formatId: number;
  topicId: number;
  coverUrl: string;
  uniqueId?: string;
  isPublic?: boolean;
  eventStartDateTime: Date;
  eventEndDateTime: Date;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  description: string;
  isTermsAndConditions: boolean;
  termAndCondition: string;
  isFullName: boolean;
  isEmail: boolean;
  isPhoneNumber: boolean;
  isIdentityNumber?: boolean;
  isDob?: boolean;
  isGender?: boolean;
  maxPerbuy?: number;
  isOneEmailOneTransaction?: boolean;
  isOneTicketOneData?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventCreationAttributes
  extends Optional<EventAttributes, "id"> {}
export interface EventInstance extends Required<EventAttributes> {}

class Event
  extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes
{
  public id!: number;
  public name!: string;
  public formatId!: number;
  public topicId!: number;
  public coverUrl!: string;
  public uniqueId!: string;
  public isPublic!: boolean;
  public eventStartDateTime!: Date;
  public eventEndDateTime!: Date;
  public address!: string;
  public city!: string;
  public latitude!: string;
  public longitude!: string;
  public description!: string;
  public isTermsAndConditions!: boolean;
  public termAndCondition!: string;
  public isFullName!: boolean;
  public isEmail!: boolean;
  public isPhoneNumber!: boolean;
  public isIdentityNumber!: boolean;
  public isDob!: boolean;
  public isGender!: boolean;
  public maxPerbuy!: number;
  public isOneEmailOneTransaction!: boolean;
  public isOneTicketOneData!: boolean;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Event.init(
  {
    id: {
      type: new DataTypes.BIGINT(),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    formatId: {
      type: new DataTypes.BIGINT(),
      allowNull: false,
    },
    topicId: {
      type: new DataTypes.BIGINT(),
      allowNull: false,
    },
    coverUrl: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    uniqueId: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    isPublic: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: true,
    },
    eventStartDateTime: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    eventEndDateTime: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    address: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    latitude: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    longitude: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    isTermsAndConditions: {
      type: new DataTypes.BOOLEAN(),
      allowNull: false,
      defaultValue: false,
    },
    termAndCondition: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    isFullName: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: true,
    },
    isEmail: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: true,
    },
    isPhoneNumber: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: true,
    },
    isIdentityNumber: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
    },
    isDob: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
    },
    isGender: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
    },
    maxPerbuy: {
      type: new DataTypes.INTEGER(),
      allowNull: true,
      defaultValue: 5,
    },
    isOneEmailOneTransaction: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
    },
    isOneTicketOneData: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
    },
    isDeleted: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
    },
    updatedAt: {
      type: new DataTypes.DATE(),
    },
  },
  {
    tableName: "events",
    sequelize: databaseInstance,
  }
);

export default Event;
