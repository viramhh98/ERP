const stockService = require("../services/stock.service");

const getStock = async (req, res) => {
  try {
    const { itemId } = req.query;

    const companyId = req.user.activeCompanyId;
    const branchId = req.user.activeBranchId;

    const stock = await stockService.getStock({
      itemId,
      companyId,
      branchId
    });

    res.json({
      success: true,
      data: stock
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching stock"
    });
  }
};

module.exports = {
  getStock
};