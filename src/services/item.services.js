const Item = require("../models/item.model");

const createItem = async (data) => {
  const existing = await Item.findOne({
    sku: data.sku,
    companyId: data.companyId
  });

  if (existing) {
    throw new Error("Item with this SKU already exists");
  }

  const item = await Item.create(data);
  return item;
};

const getItems = async (companyId) => {
  return await Item.find({ companyId });
};

module.exports = {
  createItem,
  getItems
};