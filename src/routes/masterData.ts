import express, { Request, Response, Router } from "express";
import TopicsController from "../controllers/topic.controller";
import ProvincesController from "../controllers/province.controller";
import FormatsController from "../controllers/format.controller";
import CitiesController from "../controllers/cities.controller";

export default class TopicsRouter {
  public router: Router;
  private topicsController: TopicsController;
  private provinceController: ProvincesController;
  private formatController: FormatsController;
  private citiesController: CitiesController;

  constructor() {
    this.router = Router();
    this.topicsController = new TopicsController();
    this.provinceController = new ProvincesController();
    this.formatController = new FormatsController();
    this.citiesController = new CitiesController();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // route topics
    this.router.get("/topics/", this.topicsController.getAllTopics);

    // route  province
    this.router.get("/provinces/", this.provinceController.getAllProvince);

    // route formats
    this.router.get("/formats", this.formatController.getAllFormat);

    // route untuk cities
    this.router.get("/cities/", this.citiesController.getAllCities);
    this.router.get(
      "/cities/:provinceId",
      this.citiesController.getCitiesByProvinceId
    );
  }
}
