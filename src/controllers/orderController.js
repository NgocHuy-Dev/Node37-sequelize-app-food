import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);

export const getOrder = async (req, res) => {
  try {
    const { user_id } = req.params;
    const order = await model.orders.findAll({
      where: {
        user_id,
      },
    });

    responseData(res, "Xử lý thành công", order, 200);
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};

export const addOrder = async (req, res) => {
  try {
    const { user_id, food_id, amount, arr_sub_id } = req.body;

    const checkFood = await model.food.findOne({
      where: {
        food_id,
      },
    });

    const checkUser = await model.users.findOne({
      where: {
        user_id,
      },
    });

    switch (true) {
      case !checkFood:
        responseData(res, "Không tồn tại món này", "", 404);
        break;
      case !checkUser:
        responseData(res, "Không tồn tại User", "", 404);
        break;

      default:
        const data = {
          user_id,
          food_id,
          amount,
          code: req.body.code ? req.body.code : null,
          arr_sub_id,
        };
        await model.orders.create(data);
        responseData(res, "Xử lý thành công", data, 200);
        break;
    }
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};
