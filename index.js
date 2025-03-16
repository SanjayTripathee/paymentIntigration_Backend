// import cors from "cors";
// import express, { json } from "express";
// import connectToMongoDb from "./src/connectDB/connectToMongooDb.js";
// import errorMiddleware from "./src/middlewire/errorMiddlewire.js";
// import notFoundMiddleware from "./src/middlewire/notFoundMiddleware.js";
// import webUserRouter from "./src/routes/webUserRouter.js";
// import productRouter from "./src/routes/productRouter.js";
// import router from "./src/routes/paymentRoute.js";
// import fileRouter from "./src/routes/fileRouter.js";

// let expressApp = express();
// expressApp.use(cors()); //! cors is enable so that we could hit api from browser(it is always put on top)
// expressApp.use(json()); //dont forget to import json

// expressApp.listen(8000, () => {
//   console.log("Server is running on port 8000");
//   connectToMongoDb();
// });

// expressApp.use("/web-users", webUserRouter); //write kabab case on sending part ok
// expressApp.use("/product", productRouter);
// expressApp.use("/payment", router);

// expressApp.use("/file", fileRouter);

// expressApp.use(express.static("./public"));

// expressApp.use("*", notFoundMiddleware); //! always put it after all route is decleare ..put down after route ok...

// expressApp.use(errorMiddleware);



//
import cors from "cors";
import express, { json } from "express";
import connectToMongoDb from "./src/connectDB/connectToMongooDb.js";
import errorMiddleware from "./src/middlewire/errorMiddlewire.js";
import notFoundMiddleware from "./src/middlewire/notFoundMiddleware.js";
import webUserRouter from "./src/routes/webUserRouter.js";
import productRouter from "./src/routes/productRouter.js";
import router from "./src/routes/paymentRoute.js";
import fileRouter from "./src/routes/fileRouter.js";

const expressApp = express();
expressApp.use(cors()); //! cors is enable so that we could hit api from browser(it is always put on top)
expressApp.use(json());

connectToMongoDb(); // Connect to DB before handling requests

expressApp.use("/web-users", webUserRouter);
expressApp.use("/product", productRouter);
expressApp.use("/payment", router);
expressApp.use("/file", fileRouter);
expressApp.use(express.static("./public"));
expressApp.get("/", (req, res) => {
  res.send("Welcome to E-commerce API")
});

expressApp.use("*", notFoundMiddleware);
expressApp.use(errorMiddleware);

// ✅ Start server only if not in Vercel (local mode)
if (process.env.NODE_ENV !== "vercel") {
  const PORT = process.env.PORT || 8000;
  expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// ✅ Export app for Vercel
export default expressApp;
