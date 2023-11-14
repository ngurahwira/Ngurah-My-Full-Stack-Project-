const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET";

//bcrypt
const hashing = (val) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(val, salt);
};

const verifyHash = (raw, hashed) => bcrypt.compareSync(raw, hashed);

//jwt
const createToken = (payload) => jwt.sign(payload, SECRET_KEY);
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { hashing, verifyHash, createToken, verifyToken };
