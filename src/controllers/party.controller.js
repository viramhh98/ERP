const partyService = require("../services/party.service");

const createParty = async (req, res) => {
  try {
    const party = await partyService.createParty(req.body);

    res.status(201).json({
      message: "Party created successfully",
      data: party
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating party"
    });
  }
};

const getParties = async (req, res) => {
  try {
    const { companyId, type } = req.query;

    if (!companyId) {
      return res.status(400).json({
        message: "companyId is required"
      });
    }

    const parties = await partyService.getParties({
      companyId,
      type
    });

    res.json(parties);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching parties"
    });
  }
};

const getPartyByPhone = async (req, res) => {
  try {
    const { phone, companyId } = req.query;


    if (!phone || !companyId) {
      return res.status(400).json({
        message: "phone and companyId are required"
      });
    }

    const party = await partyService.getPartyByPhone({
      phone,
      companyId
    });

    if (!party) {
      return res.status(404).json({
        message: "Party not found"
      });
    }

    res.status(200).json({
      message: "Party fetched successfully",
      data: party
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching party"
    });
  }
};

module.exports = {
  createParty,
  getParties,
  getPartyByPhone
};