const Ledger = require("../models/ledger.model");

const createLedger = async ({
  partyId,
  companyId,
  branchId,
  type,
  amount,
  referenceType,
  referenceId,
  description
}, session) => {

  const entry = await Ledger.create([{
    partyId,
    companyId,
    branchId,
    type,
    amount,
    referenceType,
    referenceId,
    description
  }], { session });

  return entry[0];
};

module.exports = {
  createLedger
};