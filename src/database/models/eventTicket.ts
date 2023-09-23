import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db";

// Database connection instance
let databaseInstance = new Database().database;

export interface EventTicketAttributes {
  id?: number;
  eventId: number;
  name: string;
  description: string;
  type: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EventTicketCreationAttributes
  extends Optional<EventTicketAttributes, "id"> {}
export interface EventTicketInstance extends Required<EventTicketAttributes> {}

class EventTickets
  extends Model<EventTicketAttributes, EventTicketCreationAttributes>
  implements EventTicketAttributes
{
  public id!: number;
  public eventId!: number;
  public name!: string;
  public description!: string;
  public type!: string;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EventTickets.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(),
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
    tableName: "eventTickets",
    sequelize: databaseInstance,
  }
);

export default EventTickets;
