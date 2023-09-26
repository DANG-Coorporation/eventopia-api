import { Request, response, Response } from "express";
import { ProcessError } from "../helper/Error/errorHandler";
import ProvincesService from "../service/province.service";

const provinceService = new ProvincesService();

export default class ProvincesController {
  async createProvince(req: Request, res: Response): Promise<void> {
    try {
      const provinceData = req.body;
      const provinces = await provinceService.createProvince(provinceData);
      res.json({
        statusCode: 200,
        message: "success",
        data: provinces,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }

  async getAllProvince(req: Request, res: Response) {
    try {
      const provinces = await provinceService.getAllProvinces();
      res.json({
        statusCode: 200,
        message: "success",
        data: provinces,
      });
    } catch (err) {
      ProcessError(err, res);
    }
  }
}
