const mongoose = require("mongoose");

const Purchase = require("../models/purchase.model");
const stockService = require("./stock.service");
const stockTransactionService = require("./stockTransaction.service");
const ledgerService = require("./ledger.service");

const createPurchase = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const purchase = await Purchase.create([data], { session });

    const purchaseDoc = purchase[0];

    // 🔥 Loop items
    for (const item of data.items) {

      // 1️⃣ Increase Stock
      await stockService.increaseStock({
        itemId: item.itemId,
        companyId: data.companyId,
        branchId: data.branchId,
        quantity: item.quantity,
        session
      });

      // 2️⃣ Stock Transaction (AUDIT)
      await stockTransactionService.createStockTransaction({
        itemId: item.itemId,
        companyId: data.companyId,
        branchId: data.branchId,
        type: "IN",
        quantity: item.quantity,
        referenceType: "PURCHASE",
        referenceId: purchaseDoc._id
      }, session);
    }

    // 3️⃣ Ledger Entry (You owe supplier)
    await ledgerService.createLedger({
      partyId: data.partyId,
      companyId: data.companyId,
      branchId: data.branchId,
      type: "CREDIT",
      amount: data.totalAmount,
      referenceType: "PURCHASE",
      referenceId: purchaseDoc._id
    }, session);

    await session.commitTransaction();
    session.endSession();

    return purchaseDoc;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  createPurchase
};