const { verifyHash, createToken } = require("../helpers");
const { Profile } = require("../models");

class UserLogin {
  //! Register
  static async register(req, res, next) {
    try {
      const { fullname, address, email, password } = req.body;
      const dataUser = await Profile.create({
        fullname,
        address,
        balance: 0,
        email,
        password,
      });

      if (!password || !email) throw new Error("Login error");

      res.status(201).json({
        dataUser,
      });
      //   console.log(dataUser, 1212);
    } catch (error) {
      next(error);
    }
  }
  //! Login
  static async login(req, res, next) {
    try {
      const { id, email, password } = req.body;
      console.log(req.body, 12121212);
      if (!password || !email) throw new Error("Login error");
      const data = await Profile.findOne({
        where: {
          email,
        },
      });
      console.log(data);
      if (!data) {
        throw new Error("User not found");
      }

      let compere = verifyHash(password, data.password);
      console.log(compere);
      if (!compere) {
        throw new Error(`Password wrong`);
      }

      let payload = {
        id: data.id,
        email: data.email,
      };

      let token = createToken(payload);
      // console.log(token);
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserLogin;
