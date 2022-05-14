const jwt = require("jsonwebtoken");
require("dotenv").config();

const token = (id, type) =>
  jwt.sign(
    {
      id,
      type,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

module.exports = token;
