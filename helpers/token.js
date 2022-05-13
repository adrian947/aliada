const jwt = require("jsonwebtoken");
require("dotenv").config();

const token = (id, user_key) =>

  
  jwt.sign(
    {
      id,
      user_key
    },
    process.env.SECRET_KEY,
    { expiresIn: "1d" }
  );

module.exports = token;
