import { Router } from "express";
import upload from "../middlewire/uploadFile.js";
import { crateFile, crateMultipleFile } from "../controller/fileController.js";

// import upload from "../middleware/uploadFile.js";
// import { crateFile, crateMultipleFile} from "../controller/fileController.js";

let fileRouter = Router();

fileRouter.route("/single").post(upload.single("file"), crateFile);

fileRouter
  .route("/multiple")

  .post(upload.array("file"), crateMultipleFile);

export default fileRouter;
