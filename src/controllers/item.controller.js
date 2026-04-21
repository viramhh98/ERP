const itemService = require("../services/item.services");

const createItem = async (req, res) => {
  try {
    const companyId = req.user.activeCompanyId; // 🔥 from token

    const item = await itemService.createItem({
      ...req.body,
      companyId
    });

    res.status(201).json({
      message: "Item created successfully",
      data: item
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Error creating item"
    });
  }
};

const getItems = async (req, res) => {
  try {
    const companyId = req.user.activeCompanyId; // 🔥 FIX HERE

    const items = await itemService.getItems(companyId);

    res.json({
      success: true,
      data: items
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching items"
    });
  }
};

module.exports = {
  createItem,
  getItems
};