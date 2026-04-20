const Party = require("../models/party.model");

const createParty = async (data) => {
  const party = await Party.create(data);
  return party;
};

const getParties = async ({ companyId, type }) => {
  const query = { companyId };

  if (type) {
    query.type = type;
  }

  const parties = await Party.find(query);

  return parties;
};

const getPartyByPhone = async ({ phone, companyId }) => {
  return await Party.findOne({
    phone,
    companyId,
  });
};

module.exports = {
  createParty,
  getParties,
  getPartyByPhone,
};
