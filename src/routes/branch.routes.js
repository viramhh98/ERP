const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const { validateCreateBranch } = require("../middleware/validateBranch.middleware");
const branchController = require("../controllers/branch.controller");

// Create branch
router.post(
  "/:companyId",
  authMiddleware,
  validateCreateBranch,
  branchController.createBranch
);

// Get all branches by company
router.get(
  "/:companyId",
  authMiddleware,
  branchController.getBranches
);

module.exports = router;