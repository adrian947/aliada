const query = require("../db/config");

const newTicket = async (req, res) => {
  const { description, name_user, surname_user } = req.body;

  try {
    const resp = await query(
      "INSERT INTO tickets SET ?; SELECT LAST_INSERT_ID() as id",
      [{ description, name_user, surname_user }]
    );

    const id = resp[1];

    res.status(201).json({ msg: "Reclamo ingresado con exito", id: id[0].id });
  } catch (error) {
    res.status(403).json({ msg: error });
  }
};

const getTickets = async (req, res) => {
  const { page, status } = req.params;

  //*return all tickets
  try {
    if (status === "Todos") {
      const resp = await query(
        `SELECT tickets.id, status, description, name_user, surname_user, observation, date, name, type, email, operator_id 
         from tickets left join operators on tickets.operator_id = operators.id LIMIT ?, ?`,
        [parseInt(page) * 3, 3]
      );

      const totalRegister = await query(`SELECT count(*) total from tickets`);
      return res.status(200).json({ resp, total: totalRegister[0].total });
    }
  
  //*return filter tickets by status  
    const resp = await query(
      `SELECT tickets.id, status, description, name_user, surname_user, observation, date, name, type, email, operator_id 
       from tickets left join operators on tickets.operator_id = operators.id WHERE tickets.status = ? 
       LIMIT ${parseInt(page) * 3} , 3`,
       [status]
    );

    const totalRegister = await query(
      `SELECT count(*) total from tickets WHERE tickets.status = ?`,
      [status]
    );

    return res.status(200).json({ resp, total: totalRegister[0].total });
  } catch (error) {
    return res.status(403).json({ msg: error });
  }
};

const updateTicket = async (req, res) => {
  const { id } = req.params;

  const { status, observation, operator_id } = req.body;

  let verifyTicket = await query("SELECT * FROM tickets WHERE  id = ? ", [id]);

  if (!verifyTicket.length) {
    return res.status(400).json({ msg: "El ticket no existe" });
  }

  verifyTicket = verifyTicket[0];

  const UpdateField = async () => {
    const resp = await query(
      `UPDATE tickets set ? WHERE id = ?; 
       SELECT tickets.id, status, description, name_user, surname_user, observation, date, name, email 
       from tickets left join operators on tickets.operator_id = operators.id WHERE tickets.id = ?`,
      [{ status, observation, operator_id }, id, id]
    );

    return res.status(201).json({ msg: "Ticket Actualizado", data: resp[1] });
  };

  switch (req.operator[0].type) {
    case "operator_key":
      {
        UpdateField();
      }
      break;

    case "operator":
      {
        if (
          verifyTicket.operator_id !== req.operator[0].id &&
          verifyTicket.operator_id
        ) {
          return res.status(401).json({
            msg: "No tienes permisos para modificar el ticket de otro operador",
          });
        }

        if (
          (verifyTicket.operator_id &&
            req.body.operator_id === req.operator[0].id) ||
          !verifyTicket.operator_id
        ) {
          UpdateField();
        } else {
          return res.status(401).json({
            msg: "No estas autorizado a darle una tarea a otro operador",
          });
        }
      }
      break;

    default:
      break;
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;

  const verifyTicket = await query("SELECT * FROM tickets WHERE  id = ? ", [
    id,
  ]);

  if (!verifyTicket.length) {
    return res.status(400).json({ msg: "El ticket no existe" });
  }

  if (req.operator[0].type !== "operator_key") {
    return res
      .status(401)
      .json({ msg: "No estas autorizado a eliminar el ticket" });
  }

  await query("DELETE FROM tickets WHERE id = ?", [id]);
  return res.status(200).json({ msg: "Ticket eliminado" });
};

module.exports = {
  newTicket,
  getTickets,
  updateTicket,
  deleteTicket,
};
