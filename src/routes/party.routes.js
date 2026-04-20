const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const partyController = require("../controllers/party.controller");
const {validateCreateParty} = require("../middleware/validateParty.middleware");
// Create party
router.post("/", authMiddleware, validateCreateParty, partyController.createParty);

// Get parties (filter by type optional)
router.get("/filter", authMiddleware, partyController.getParties);

// Get party by phone number
router.get("/phone", authMiddleware, partyController.getPartyByPhone);

module.exports = router;
