const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  // console.log(err.name);

  switch (err.name) {
    case "SequelizeDatabaseError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeForeignKeyConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Please login first!!";
      break;
  }

  switch (err.message) {
    case "Unauthorized":
      status = 401;
      message = "Please login first!!";
      break;
    case "User not found":
      status = 401;
      message = `User not found`;
      break;
    case "Login error":
      status = 401;
      message = `Required`;
      break;
    case "Password wrong":
      status = 401;
      message = `Password not matched`;
      break;
    case "Forbidden":
      status = 403;
      message = `You don't have the right access`;
      break;
    case "NotFound":
      status = 404;
      message = " Not Found";
      break;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler;
