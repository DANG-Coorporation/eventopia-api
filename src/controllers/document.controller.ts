import { Request, Response } from "express";
import MinioService from "../service/minio.service"; // Import MinioService properly
import { ProcessError } from "../helper/Error/errorHandler";
import * as fs from "fs";
export default class DocumentController {
  private minioService: MinioService;

  constructor() {
    this.minioService = new MinioService(); // Initialize the MinioService instance
  }

  async uploadDocument(req: Request, res: Response) {
    try {
      const file = req.file;
      console.log(file);
      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      const fileUrl = await this.minioService.uploadFile(file); // Use the MinioService method to upload the file
      fs.unlinkSync(file.path);
      res.status(200).json({
        message: "File uploaded successfully",
        fileUrl,
      });
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Error uploading file:", error);
      ProcessError(error, res);
    }
  }

  async getDocument(req: Request, res: Response) {
    try {
      const fileUrl = req.query.fileUrl;
      if (!fileUrl) {
        return res.status(400).json({ message: "No fileUrl provided" });
      }

      const file = await this.minioService.getBuffer(
        "eventopia",
        fileUrl.toString()
      );

      res.status(200).json({
        message: "File retrieved successfully",
        file,
      });
    } catch (error) {
      console.error("Error retrieving file:", error);
      ProcessError(error, res);
    }
  }
}
