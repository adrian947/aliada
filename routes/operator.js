const express = require("express");
const routerOperator = express.Router();
const { newOperator, loginOperator } = require("../controllers/operatorController");

routerOperator.post("/register", newOperator);
routerOperator.post("/login", loginOperator);

module.exports = routerOperator;
