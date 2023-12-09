import express from "express";
import { addRate, getRateByRes } from "../controllers/rateController.js";

const rateRoute = express.Router();
rateRoute.post("/add-rate", addRate);
rateRoute.get("/get-rate-by-res/:res_id", getRateByRes);

export default rateRoute;
