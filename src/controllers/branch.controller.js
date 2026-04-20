const branchService = require("../services/branch.service");

const createBranch = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { companyId } = req.params;

    const branch = await branchService.createBranch({
      name,
      address,
      companyId
    });

    res.status(201).json(branch);
  } catch (error) {
    res.status(500).json({ message: "Error creating branch" });
  }
};

const getBranches = async (req, res) => {
  try {
    const { companyId } = req.params;

    const branches = await branchService.getBranchesByCompany(companyId);

    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching branches" });
  }
};

module.exports = {
  createBranch,
  getBranches
};