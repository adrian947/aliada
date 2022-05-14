const express = require("express");
const routerOperator = express.Router();
const { newOperator, loginOperator, getOperator } = require("../controllers/operatorController");
const checkAuthUser = require("../middlewares/checkAuthUser");

routerOperator.post("/register", newOperator);
routerOperator.post("/login", loginOperator);
routerOperator.get("/", checkAuthUser, getOperator);

module.exports = routerOperator;
