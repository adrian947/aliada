const query = require("../db/config");

const validateNewOperator = async (body) => {
  const { email, name, password } = body;

  //* validate if fields empty
  if ((email === "", name === "", password === "")) {
    return {
      ok: false,
      msg: "Todos los campos deben ser completados",
    };
  }

  //* validate if is email
  const emailRegex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!emailRegex.test(email)) {
    return {
      ok: false,
      msg: "El email no es valido",
    };
  }

  //* validate if user exists
  const operator = await query(`SELECT * FROM operators WHERE email = ?`, [
    email,
  ]);

  if (operator.length > 0) {
    return {
      ok: false,
      msg: "Usuario ya fue registrado",
    };
  }

  return {
    ok: true,
  };
};

module.exports = validateNewOperator;
