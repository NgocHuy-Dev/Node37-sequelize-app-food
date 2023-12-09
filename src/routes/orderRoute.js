import express from "express";
import { getOrder, addOrder } from "../controllers/orderController.js";

const orderRoute = express.Router();
orderRoute.post("/add-order", addOrder);
orderRoute.get("/get-order-by-user/:user_id", getOrder);

export default orderRoute;
