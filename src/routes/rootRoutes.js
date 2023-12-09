import express from "express";
import likeRoute from "./likeRoutes.js";
import rateRoute from "./rateRoutes.js";
import orderRoute from "./orderRoute.js";

const rootRoute = express.Router();

rootRoute.use("/like", likeRoute);
rootRoute.use("/rate", rateRoute);
rootRoute.use("/order", orderRoute);

export default rootRoute;
