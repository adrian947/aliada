const express = require("express");
const routerOperator = express.Router();
const { newOperator, loginOperator, getOperator, getOperators } = require("../controllers/operatorController");
const checkAuthOperator = require("../middlewares/checkAuthOperator");
const checkAuthUser = require("../middlewares/checkAuthUser");

routerOperator.post("/register", newOperator);
routerOperator.post("/login", loginOperator);
routerOperator.get("/", checkAuthUser, getOperator);
routerOperator.get("/operators", checkAuthOperator, getOperators);

module.exports = routerOperator;
