const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleController = require("../controllers/role.controller");
const validateRole = require("../middleware/validateRole.middleware");

// create role for a company
router.post(
  "/:companyId",
  authMiddleware,
  validateRole.validateCreateRole,
  roleController.createRole
);


// get all roles for a company
router.get(
  "/:companyId",
  authMiddleware,
  roleController.getRolesByCompany
);

module.exports = router;