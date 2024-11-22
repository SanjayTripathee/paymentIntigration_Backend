import expressAsyncHandler from "express-async-handler";
import { Product } from "../schema/model.js";

export const crateProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result1 = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      result: result1,
    });
  }
);
export const readAllProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result = await Product.find({});
    res.status(200).json({
      success: true,
      message: "Product read successfully",
      result: result,
    });
  }
);
export const readSpecificProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result3 = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Specific Product read successfully",
      result: result3,
    });
  }
);
export const updateProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result4 = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      result: result4,
    });
  }
);
export const deleteProductController = expressAsyncHandler(
  async (req, res, next) => {
    let result5 = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result: result5,
    });
  }
);
