const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const getMyRole = require("../controllers/userCompanyRole.controller");

router.get("/me", authMiddleware, getMyRole);

module.exports = router;