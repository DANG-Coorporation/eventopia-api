import { Request, Response, Router } from "express";
import DocumentController from "../controllers/document.controller";
import multer from "multer";
import { extname } from "path"; // Import extname to get the file extension

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtension = extname(file.originalname);
      cb(null, uniqueSuffix + fileExtension); // Save with random name and original extension
    },
  }),
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/)) {
      return cb(new Error("Only image and pdf files are allowed!"));
    }
    cb(null, true);
  },
});

function multerMiddleware(req: Request, res: Response, next: Function) {
  upload.single("file")(req, res, function (error: any) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
}

export default class DocumentRouter {
  router: Router;
  documentController: DocumentController;
  constructor() {
    this.documentController = new DocumentController();
    this.router = Router({ mergeParams: true });
    this.userRoutes();
  }

  private userRoutes() {
    this.router.post(
      "/uploads",
      multerMiddleware,
      (req: Request, res: Response) =>
        this.documentController.uploadDocument(req, res)
    );
  }
}
