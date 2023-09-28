import { Request, Response } from "express";
import { ProcessError } from "../helper/Error/errorHandler";
import CitiesService from "../service/citiies.service";
import { HttpStatusCode } from "axios";

export default class CitiesController {
  async getAllCities(req: Request, res: Response): Promise<void> {
    try {
      const cities = await CitiesService.getAllCities();
      res.json({
        statusCode: 200,
        message: "Success",
        data: cities,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async getCitiesByProvinceId(req: Request, res: Response): Promise<void> {
    try {
      const { provinceId } = req.params;
      const cities = await CitiesService.getCitiesByProvinceId(
        Number(provinceId)
      );
      res.status(HttpStatusCode.Ok).json({
        statusCode: HttpStatusCode.Ok,
        message: "Success",
        data: cities,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
