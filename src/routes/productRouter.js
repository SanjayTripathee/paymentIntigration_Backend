import { Router } from "express";
import {
  crateProductController,
  deleteProductController,
  readAllProductController,
  readSpecificProductController,
  updateProductController,
} from "../controller/productController.js";

let productRouter = Router();
productRouter
  .route("/")
  .post(crateProductController)
  .get(readAllProductController);
productRouter
  .route("/:id")
  .get(readSpecificProductController)
  .patch(updateProductController)
  .delete(deleteProductController);
export default productRouter;
