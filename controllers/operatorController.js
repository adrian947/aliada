const query = require("../db/config");
const bcrypt = require("bcryptjs");
const token = require("../helpers/token");
const validateNewOperator = require("../helpers/validateNewOperator");

const newOperator = async (req, res) => {
  const respValidator = await validateNewOperator(req.body);

  if (!respValidator.ok) {
    return res.status(401).json({ msg: respValidator.msg });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  req.body.password = hash;

  await query("INSERT INTO operators SET ?", [req.body]);

  res.status(201).json({ msg: "Usuario creado con exito" });
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

  res.status(200).json({
    id: operator.id,
    name: operator.name,
    email: operator.email,
    type: operator.type,
    token: token(operator.id, operator.type),
  });
};

//* returns the logged operator if the token is valid
const getOperator = async (req, res) => {
  try {
    let operator = await query(
      `SELECT name, email ,id, type FROM operators WHERE id = ?`,
      [req.operator[0].id]
    );
    operator = operator[0];
    res.status(200).json({
      operator,
    });
  } catch (error) {
    return res.status(401).json({ msg: "Token invalido" });
  }
};


//* return all operators
const getOperators = async (req, res) => {
  try {
    const operators = await query(
      `SELECT name, id FROM operators WHERE type = 'operator_key' OR type = 'operator'`
    );

    return res.status(200).json(operators);
  } catch (error) {
    return res.status(401).json({ msg: "Token invalido" });
  }
};

module.exports = {
  newOperator,
  loginOperator,
  getOperator,
  getOperators,
};
