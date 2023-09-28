import Cities, { CitiesInstance } from "../database/models/cities";

class CitiesService {
  async getAllCities(): Promise<CitiesInstance[]> {
    try {
      const cities = await Cities.findAll();
      return cities;
    } catch (error) {
      throw new Error(`Error while fetching cities: ${error}`);
    }
  }

  async getCitiesByProvinceId(provinceId: number): Promise<CitiesInstance[]> {
    try {
      const cities = await Cities.findByProvinceId(provinceId);
      return cities;
    } catch (error) {
      throw new Error(`Error while fetching cities by provinceId: ${error}`);
    }
  }
}

export default new CitiesService();
