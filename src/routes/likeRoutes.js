import express from "express";
import { addLike, getLikeByRes } from "../controllers/likeController.js";

const likeRoute = express();

likeRoute.get("/get-like-by-res-id/:resId", getLikeByRes);
likeRoute.post("/add-like", addLike);

export default likeRoute;
