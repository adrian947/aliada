const express = require("express");
const routerTicket = express.Router();
const { getTickets, newTicket, updateTicket, deleteTicket } = require("../controllers/ticketController");
const checkAuthOperator = require("../middlewares/checkAuthOperator");
const checkAuthUser = require("../middlewares/checkAuthUser");

routerTicket.post("/",checkAuthUser, newTicket);
routerTicket.get("/",checkAuthOperator, getTickets);
routerTicket.put("/:id",checkAuthOperator, updateTicket);
routerTicket.delete("/:id",checkAuthOperator, deleteTicket);

module.exports = routerTicket;
