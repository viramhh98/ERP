const mongoose = require("mongoose");

const Sale = require("../models/sale.model");
const stockService = require("./stock.service");
const stockTransactionService = require("./stockTransaction.service");
const ledgerService = require("./ledger.service");

const createSale = async (data) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let subtotal = 0;

    // 🔥 Calculate totals
    for (const item of data.items) {
      const itemTotal = item.quantity * item.price;
      item.total = itemTotal;
      subtotal += itemTotal;
    }

    data.totalAmount = subtotal;

    // 🔥 Create sale
    const sale = await Sale.create([data], { session });
    const saleDoc = sale[0];

    // 🔥 Loop items
    for (const item of data.items) {

      // ❗ Check + decrease stock
      await stockService.decreaseStock({
        itemId: item.itemId,
        companyId: data.companyId,
        branchId: data.branchId,
        quantity: item.quantity,
        session
      });

      // 🔁 Stock transaction
      await stockTransactionService.createStockTransaction({
        itemId: item.itemId,
        companyId: data.companyId,
        branchId: data.branchId,
        type: "OUT",
        quantity: item.quantity,
        referenceType: "SALE",
        referenceId: saleDoc._id
      }, session);
    }

    // 💰 Ledger (customer owes you)
    await ledgerService.createLedger({
      partyId: data.partyId,
      companyId: data.companyId,
      branchId: data.branchId,
      type: "DEBIT",
      amount: data.totalAmount,
      referenceType: "SALE",
      referenceId: saleDoc._id
    }, session);

    await session.commitTransaction();
    session.endSession();

    return saleDoc;

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

module.exports = {
  createSale
};