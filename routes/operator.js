const express = require("express");
const routerOperator = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const { newOperator, loginOperator } = require("../controllers/operatorController");

routerOperator.post("/register",checkAuth ,newOperator);
routerOperator.post("/login", loginOperator);

module.exports = routerOperator;
