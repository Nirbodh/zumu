const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["deposit", "withdraw"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["bkash", "nagad", "rocket", "paypal", "upi", "manual"],
      default: "manual",
    },
    transactionId: {
      type: String, // user যে txnId দিবে (যেমন bkash txn id)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
