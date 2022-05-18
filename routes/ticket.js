const express = require("express");
const routerTicket = express.Router();
const checkAuthUser = require("../middlewares/checkAuthUser");
const checkAuthOperator = require("../middlewares/checkAuthOperator");
const { getTickets, newTicket, updateTicket, deleteTicket } = require("../controllers/ticketController");

routerTicket.post("/",checkAuthUser, newTicket);
routerTicket.get("/:page/:status",checkAuthOperator, getTickets);
routerTicket.put("/:id",checkAuthOperator, updateTicket);
routerTicket.delete("/:id",checkAuthOperator, deleteTicket);

module.exports = routerTicket;
