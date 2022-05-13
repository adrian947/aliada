const express = require("express");
const routerTicket = express.Router();
const { getTickets, newTicket, updateTicket, deleteTicket } = require("../controllers/ticketController");
const checkAuth = require("../middlewares/checkAuth");

routerTicket.post("/",checkAuth, newTicket);
routerTicket.get("/",checkAuth, getTickets);
routerTicket.put("/:id",checkAuth, updateTicket);
routerTicket.delete("/:id",checkAuth, deleteTicket);

module.exports = routerTicket;
