const getDataById = require("../helpers/bidHelper");
const { Product } = require("../models");

class Controller {
  static async showData(req, res, next) {
    try {
      const { id } = req.params;
      const data = await getDataById(id);
      console.log(data);

      res.status(200).json({
        bid: data.get("name_event"),
      });
    } catch (error) {
      console.log(error);
    }
  }
  static async addproduct(req, res, next) {
    try {
      const { name, price, description, category } = req.body;
      const product = await Product.create({
        name,
        price,
        description,
        category,
      });
      res.status(201).json({ message: "input success", product });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
