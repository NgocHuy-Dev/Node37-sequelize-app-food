import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import restaurant from "../models/restaurant.js";

let model = initModels(sequelize);

export const addLike = async (req, res) => {
  try {
    const { resId, userId } = req.body;
    let addLike = {
      res_id: resId,
      user_id: userId,
      date_like: new Date(),
    };
    await model.like_res.create(addLike);
    responseData(res, "Thêm lượt like thành công", "", 200);
  } catch {
    responseData(res, "Thêm lượt like không thành công", "", 500);
  }
};

export const unLike = async (req, res) => {
  try {
    const { res_id, user_id } = req.body;
    let addLike = {
      res_id,
      user_id,
      date_like: new Date(),
    };
    await model.like_res.create(addLike);
    responseData(res, "Thêm lượt like thành công", "", 200);
  } catch {
    responseData(res, "Thêm lượt like không thành công", "", 500);
  }
};
export const getLikeByRes = async (req, res) => {
  try {
    let { resId } = req.params;
    let data = await model.like_res.findAll({
      where: {
        res_id: resId,
      },
      include: [
        {
          model: model.restaurant,
          as: "restaurant",
        },
      ],
    });
    responseData(res, "Thành công", data, 200);
  } catch {
    responseData(res, "Lỗi...", "", 500);
  }
};
