const {
  getDataById,
  getAllData,
  updateSpreadsheet,
} = require("../helpers/bidHelper");
const MakePayment = require("../helpers/ipaymuController");

class Controller {
  static async showData(req, res, next) {
    try {
      const data = await getAllData();
      console.log(data);
      res.status(200).json({ data });
    } catch (error) {
      console.error("Error fetching all data:", error);
      next(error);
    }
  }

  static async showDataDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await getDataById(id);

      res.status(200).json({
        Item: data.get("item"),
        Price: data.get("amount"),
        Daysleft: data.get("daysleft"),
        Description: data.get("description"),
        Img: data.get("img_url"),
        Status: data.get("status"),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateData(req, res, next) {
    try {
      const { id } = req.params;

      const { Price } = req.body;
      const updatedData = {
        amount: Price,
      };
      const paymentData = await MakePayment.payment(req, res, next);

      // console.log("tets12345", paymentData);
      await updateSpreadsheet(id, updatedData);
      res.status(200).json({
        message: "Data updated successfully",
        paymentUrl: paymentData.Data.Url,
      });
    } catch (error) {
      console.error("Error:", error);
      next(error);
    }
  }
}

module.exports = Controller;
