const purchaseService = require("../services/purchase.service");

const createPurchase = async (req, res) => {
  try {
    const companyId = req.user.activeCompanyId;
    const branchId = req.user.activeBranchId;

    const purchase = await purchaseService.createPurchase({
      ...req.body,
      companyId,
      branchId
    });

    res.status(201).json({
      message: "Purchase created successfully",
      data: purchase
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Error creating purchase"
    });
  }
};

module.exports = {
  createPurchase
};