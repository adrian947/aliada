const jwt = require("jsonwebtoken");
const query = require("../DB/config");

const checkAuthOperator = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.SECRET_KEY);

      req.operator = await query(
        `SELECT DISTINCT (id), type FROM operators WHERE id = ${decode.id}`
      );

      if (
        req.operator[0].type !== "operator" &&
        req.operator[0].type !== "operator_key"
      ) {
        return res
          .status(404)
          .json({ msg: "No tienes permisos para realizar esta tarea" });
      }

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Token invalido" });
    }
  } else {
    return res.status(401).json({ msg: "Token invalido o no enviado" });
  }
};

module.exports = checkAuthOperator;
