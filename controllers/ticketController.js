const query = require("../db/config");

const newTicket = async (req, res) => {
  const { description, name_user, surname_user } = req.body;

  try {
    await query("INSERT INTO tickets SET ?", [
      { description, name_user, surname_user },
    ]);

    res.status(200).json({ msg: "Reclamo ingresado con exito" });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
};

const getTickets = async (req, res) => {
  try {
    const resp = await query(
      `SELECT status, description, name_user, surname_user, observation, date, name, email, phone 
       from tickets left join operators on tickets.operator_id = operators.id`
    );

    res.status(200).json({ data: resp });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { status, observation, operator_id } = req.body;

  const movementsVerify = await query(
    "SELECT * FROM movements WHERE user_id = ? AND id = ? ",
    [req.user[0].id, id]
  );

  if (movementsVerify.length === 0) {
    return res.status(403).json({ msg: "you not have permission" });
  }

  const newData = {
    concepts,
    amount,
  };

  await query("UPDATE movements set ? WHERE id = ?", [newData, id]);
  const movements = await query("SELECT * FROM movements WHERE user_id = ?", [
    req.user[0].id,
  ]);

  return res
    .status(200)
    .json({ msg: "Movement added successfully", movement: movements });
};

module.exports = {
  newTicket,
  getTickets,
  updateTicket,
};
