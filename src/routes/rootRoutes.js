import express from "express";
import likeRoute from "./likeRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/like", likeRoute);

export default rootRoute;
