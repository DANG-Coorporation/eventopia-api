import { ProvinceAttributes } from "../database/models/province";
import Provinces from "../database/models/province";

export default class ProvincesService {
  async createProvince(
    provinceData: ProvinceAttributes
  ): Promise<ProvinceAttributes> {
    try {
      const province = await Provinces.create(provinceData);
      return province;
    } catch (error) {
      throw new Error("Gagal membuat province baru");
    }
  }

  async getAllProvinces() {
    try {
      const province = await Provinces.findAll();
      return province;
    } catch (error) {
      throw new Error("Gagal mengambil data Topik");
    }
  }
}
