const { verifyHash, createToken } = require("../helpers");
const { Profile } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

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
        role: "customer",
      });

      if (!password || !email) throw new Error("Login error");

      res.status(201).json({
        message: `${fullname} success create`,
        dataUser: {
          id: dataUser.id,
          email: dataUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  //! Login
  static async login(req, res, next) {
    try {
      const { id, email, password } = req.body;
      // console.log(req.body, 12121212);
      if (!password || !email) throw new Error("Login error");
      const data = await Profile.findOne({
        where: {
          email,
        },
      });
      // console.log(data);
      if (!data) {
        throw new Error("User not found");
      }

      let compere = verifyHash(password, data.password);
      // console.log(compere);
      if (!compere) {
        throw new Error(`Password wrong`);
      }

      let payload = {
        id: data.id,
        email: data.email,
        role: data.role,
      };

      let token = createToken(payload);
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async loginGoogle(req, res, next) {
    try {
      // console.log(req.headers.g_token);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.g_token,
        audience: process.env.G_CLIENT,
      });
      const payload = ticket.getPayload();

      const user = await Profile.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          fullname: payload.name,
          email: payload.email,
          address: payload.locale,
          balance: 0,
          role: "customer",
          password: String(Math.random()),
        },
      });

      let token = createToken(payload);
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      console.error("Error in loginGoogle:", error);
      next(error);
    }
  }
}

module.exports = UserLogin;
