// const authorization = async (req, res, next) => {
//   try {
//     const { role } = req.loginInfo;

//     if (role !== "admin") {
//       throw new Error("Forbidden");
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { authorization };
