const Branch = require("../modules/branch.model");

const createBranch = async ({ name, address, companyId }) => {
  return await Branch.create({
    name,
    address,
    companyId
  });
};

const getBranchesByCompany = async (companyId) => {
  return await Branch.find({ companyId });
};

module.exports = {
  createBranch,
  getBranchesByCompany
};