import { DataTypes, Model, Optional } from "sequelize";
import Database from "../../config/db"; // Pastikan path ke Database sesuai dengan struktur proyek Anda
import Provinces from "./province";

const databaseInstance = Database.database;

export interface CitiesAttributes {
  id?: number;
  provinceId: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CitiesCreationAttributes
  extends Optional<CitiesAttributes, "id"> {}
export interface CitiesInstance extends Required<CitiesAttributes> {}
getProvince: () => Promise<Provinces>;

class Cities
  extends Model<CitiesAttributes, CitiesCreationAttributes>
  implements CitiesAttributes
{
  public id!: number;
  public provinceId!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Definisikan hubungan dengan model Provinces
  public getProvince!: Promise<Provinces>;
  // metode statis untuk mencari kota berdasarkan provinceId
  static async findByProvinceId(provinceId: number): Promise<CitiesInstance[]> {
    try {
      const cities = await Cities.findAll({
        where: {
          provinceId,
        },
      });

      return cities;
    } catch (error) {
      throw new Error(`Error while fetching cities by province: ${error}`);
    }
  }
}

Cities.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    provinceId: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE(),
    },
    updatedAt: {
      type: DataTypes.DATE(),
    },
  },
  {
    tableName: "cities",
    sequelize: databaseInstance,
  }
);

// hubungan dengan model Province
Cities.belongsTo(Provinces, {
  foreignKey: "provinceId",
  as: "province",
});

export default Cities;
