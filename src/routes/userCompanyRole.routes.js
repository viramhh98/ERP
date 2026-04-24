const express = require("express");
const router = express.Router();

const activeCompanyMiddleware = require("../middleware/activeCompany.middleware");
const activeBranchMiddleware = require("../middleware/activeBranch.middleware");
const authMiddleware = require("../middleware/auth.middleware");
const {getMyRole,getallCompanyBranches} = require("../controllers/userCompanyRole.controller");



router.get("/me", authMiddleware,activeCompanyMiddleware, activeBranchMiddleware, getMyRole);
router.get("/allcompanybranches", authMiddleware, getallCompanyBranches);
module.exports = router;