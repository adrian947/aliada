const query = require("../db/config");
const bcrypt = require("bcryptjs");
const token = require("../helpers/token");

const newOperator = async (req, res) => {
  const operator = await query(`SELECT * FROM operators WHERE email = ?`, [
    req.body.email,
  ]);

  if (operator.length > 0) {
    return res.status(401).json({ msg: "Operador ya fue registrado" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hash;

  await query("INSERT INTO operators SET ?", [req.body]);

  res.status(200).json({ msg: "Operador creado con exito" });
};

const loginOperator = async (req, res) => {
  let operator = await query(`SELECT * FROM operators WHERE email = ?`, [
    req.body.email,
  ]);

  if (!operator.length) {
    return res.status(401).json({ msg: "Usuario o password incorrecto" });
  }

  operator = operator[0];

  const comparePassword = bcrypt.compareSync(
    req.body.password,
    operator.password
  );

  if (!comparePassword) {
    return res.status(401).json({ msg: "Usuario o password incorrecto" });
  }

  operator.user_key = operator.user_key === 0 ? false : true;

  res.status(200).json({
    name: operator.name,
    email: operator.email,
    user_key: operator.user_key,
    token: token(operator.id, operator.user_key),
  });
};

module.exports = {
  newOperator,
  loginOperator,
};
