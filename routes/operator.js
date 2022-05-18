const express = require("express");
const routerOperator = express.Router();
const checkAuthUser = require("../middlewares/checkAuthUser");
const checkAuthOperator = require("../middlewares/checkAuthOperator");
const { newOperator, loginOperator, getOperator, getOperators } = require("../controllers/operatorController");

routerOperator.post("/register", newOperator);
routerOperator.post("/login", loginOperator);
routerOperator.get("/", checkAuthUser, getOperator);
routerOperator.get("/operators", checkAuthOperator, getOperators);

module.exports = routerOperator;
