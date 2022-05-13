const express = require("express");
const routerTicket = express.Router();
const { getTickets, newTicket, updateTicket } = require("../controllers/ticketController");
const checkAuth = require("../middlewares/checkAuth");

routerTicket.post("/",checkAuth, newTicket);
routerTicket.get("/",checkAuth, getTickets);
routerTicket.put("/",checkAuth, updateTicket);

module.exports = routerTicket;
