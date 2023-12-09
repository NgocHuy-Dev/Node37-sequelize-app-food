import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);

export const addLike = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    const checkLike = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    const checkRes = await model.restaurant.findOne({
      where: { res_id },
    });
    const checkUser = await model.users.findOne({
      where: { user_id },
    });
    switch (true) {
      case checkLike:
        responseData(res, "Đã like rồi", "", 404);
        break;
      case !checkUser:
        responseData(res, "Người dùng không tồn tại", "", 404);
        break;
      case !checkRes:
        responseData(res, "Nhà hàng không tồn tại", "", 404);
        break;

      default:
        let addLike = {
          user_id,
          res_id,
          date_like: new Date(),
        };
        await model.like_res.create(addLike);
        responseData(res, "Thêm lượt like thành công nee", addLike, 200);
        break;
    }
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};

export const unLike = async (req, res) => {
  try {
    const { user_id, res_id } = req.body;
    const checkLike = await model.like_res.findOne({
      where: {
        user_id,
        res_id,
      },
    });
    if (checkLike) {
      await checkLike.destroy();
      responseData(res, "Đã xóa lượt like", "", 200);
    } else {
      responseData(res, "Không tai thèm like", "", 404);
    }
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
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
      ],
    });

    responseData(res, "Xử lý thành công", data, 200);
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};
