const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const createCompany = require("../controllers/company.controller");

router.post(
  "/",
  authMiddleware,
  createCompany
);

module.exports = router;