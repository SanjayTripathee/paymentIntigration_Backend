import { model } from "mongoose";
import webUserSchema from "./webUserSchema.js";
import productSchema from "./productSchema.js";


export let WebUser = model("WebUser", webUserSchema);
export let Product = model("Product", productSchema);

