class Controller {
  static async showData(req, res, next) {
    try {
      res.send("hallo");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
