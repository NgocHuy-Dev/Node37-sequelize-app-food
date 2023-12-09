import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";
import restaurant from "../models/restaurant.js";

let model = initModels(sequelize);

export const addLike = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    let addLike = await model.like_res.create({
      user_id,
      res_id,
      date_like: new Date(),
    });
    responseData(res, "Thêm lượt like thành công", addLike, 200);
  } catch {
    responseData(res, "Thêm lượt like không thành công", "", 500);
  }
};

export const unLike = async (req, res) => {
  try {
    const { res_id, user_id } = req.body;
    let unLike = {
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
    const { res_id } = req.params;

    const data = await model.like_res.findAll({
      where: {
        res_id,
      },
      include: [
        {
          model: model.users,
          as: "user",
          attributes: ["user_id", "full_name"],
        },
        "re",
      ],
    });

    responseData(res, "Xử lý thành công", data, 200);
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};

export const getLikeByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    // kiểm tra xem có user đó không
    let checkUser = await model.users.findOne({
      where: {
        user_id,
      },
    });

    if (checkUser) {
      const data = await model.like_res.findAll({
        where: {
          user_id,
        },
        include: [
          {
            model: model.restaurant,
            as: "res",
            attributes: ["res_id", "res_name"],
          },
          "re",
        ],
      });
      responseData(res, "Xử lý thành công", data, 200);
    } else {
      responseData(res, "Không tồn tại User", "", 404);
    }
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};
