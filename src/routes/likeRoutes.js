import express from "express";
import {
  addLike,
  getLikeByRes,
  getLikeByUser,
  unLike,
} from "../controllers/likeController.js";

const likeRoute = express.Router();

// xử lý like
likeRoute.post("/add-like", addLike);
// xử lý unlike
likeRoute.delete("/un-like", unLike);
// lấy danh sách like theo nhà hàng
likeRoute.get("/get-like-by-res/:res_id", getLikeByRes);
// lấy danh sách nhà hàng mà user đã like
likeRoute.get("/get-like-by-user/:user_id", getLikeByUser);

export default likeRoute;
