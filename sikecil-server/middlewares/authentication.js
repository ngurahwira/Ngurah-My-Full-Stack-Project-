// const { verifyToken } = require("../helpers");
// const { Profile } = require("../models");

// const authentication = async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;

//     if (!authorization) {
//       throw new Error("Unauthorized");
//     }
//     const access_token = authorization.split(" ")[1]; //"Bearer" dan  encodingnya
//     const verified = verifyToken(access_token);
//     const user = await Profile.findByPk(verified.id);
//     if (!user) {
//       throw new Error("NotFound");
//     }
//     const { id, email, role } = verified;
//     req.loginInfo = {
//       userId: id,
//       email,
//       role,
//     };

//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = authentication;
