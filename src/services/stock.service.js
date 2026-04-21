const Stock = require("../models/stock.model");

// 1. Get stock
const getStock = async ({ itemId, companyId, branchId }) => {
  return await Stock.findOne({ itemId, companyId, branchId });
};

// 2. Create if not exists
const createStockIfNotExists = async ({ itemId, companyId, branchId, session }) => {
  let stock = await Stock.findOne({ itemId, companyId, branchId }).session(session);

  if (!stock) {
    const created = await Stock.create([{
      itemId,
      companyId,
      branchId,
      quantity: 0
    }], { session });

    return created[0];
  }

  return stock;
};

// 3. Increase stock
const increaseStock = async ({ itemId, companyId, branchId, quantity, session }) => {
  const stock = await createStockIfNotExists({ itemId, companyId, branchId, session });

  stock.quantity += quantity;

  await stock.save({ session });

  return stock;
};

// 4. Decrease stock
const decreaseStock = async ({ itemId, companyId, branchId, quantity, session }) => {
  const stock = await Stock.findOne({ itemId, companyId, branchId }).session(session);

  if (!stock || stock.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  stock.quantity -= quantity;

  await stock.save({ session });

  return stock;
};

module.exports = {
  getStock,
  increaseStock,
  decreaseStock
};
