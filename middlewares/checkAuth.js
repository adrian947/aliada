const jwt = require("jsonwebtoken");
const query = require("../DB/config");

const checkAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.operator = await query(
        `SELECT DISTINCT (id), user_key FROM operators WHERE id = ${decode.id}`
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Invalid token" });
    }
  } else {
    return res.status(401).json({ msg: "Invalid token not sent" });
  }
};

module.exports = checkAuth;
