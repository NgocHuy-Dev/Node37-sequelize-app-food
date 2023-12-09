import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import { responseData } from "../config/response.js";

let model = initModels(sequelize);

export const addRate = async (req, res) => {
  try {
    const { user_id, res_id, amount } = req.body;
    const checkRes = await model.rate_res.findOne({
      where: {
        res_id,
      },
    });

    switch (true) {
      case !checkRes:
        responseData(res, "Không tồn tại nhà hàng", "", 404);
        break;

      default:
        const rate = {
          user_id,
          res_id,
          amount,
          date_rate: new Date(),
        };
        await model.rate_res.create(rate);
        responseData(res, "Đã đánh giá", rate, 200);
        break;
    }
  } catch {
    responseData(res, "Lỗi tè le...", "", 500);
  }
};

export const getRateByRes = async (req, res) => {
  try {
    const { res_id } = req.params;

    const data = await model.rate_res.findAll({
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
