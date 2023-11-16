const { getDataById, getAllData } = require("../helpers/bidHelper");

class Controller {
  static async showData(req, res, next) {
    try {
      const data = await getAllData();
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
      console.log(data);

      res.status(200).json({
        Item: data.get("item"),
        Price: data.get("amount"),
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
