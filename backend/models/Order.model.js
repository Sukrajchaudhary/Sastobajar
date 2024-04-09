const mongoose = require("mongoose");
const { Schema } = mongoose;
const OrderSchema = new Schema({
  items: { type: [Schema.Types.Mixed], required: true },
  totalAmount: { type: Number },
  totalItems: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  paymentmethod: { type: String, required: true },
  status: {
    type: String,
    default: "pending",
  },
  selectedAddress: { type: [Schema.Types.Mixed], required: true },
});

exports.Order = mongoose.model("Order", OrderSchema);
