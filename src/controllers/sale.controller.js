const saleService = require("../services/sale.service");

const createSale = async (req, res) => {
  try {
    const companyId = req.user.activeCompanyId;
    const branchId = req.user.activeBranchId;

    const sale = await saleService.createSale({
      ...req.body,
      companyId,
      branchId
    });

    res.status(201).json({
      message: "Sale created successfully",
      data: sale
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Error creating sale"
    });
  }
};

module.exports = {
  createSale
};