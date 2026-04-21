const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const activeCompanyMiddleware = require("../middleware/activeCompany.middleware");
const activeBranchMiddleware = require("../middleware/activeBranch.middleware");
const { validateGetStock } = require("../middleware/validateStock.middelware");
    
const stockController = require("../controllers/stock.controller");


router.get(
  "/",
  authMiddleware,
  activeCompanyMiddleware,
  activeBranchMiddleware,
  validateGetStock,
  stockController.getStock
);

module.exports = router;