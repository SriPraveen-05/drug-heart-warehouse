const mongoose = require('mongoose');

const transportHistorySchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const paymentSchema = new mongoose.Schema({
  paid: {
    type: Boolean,
    default: false, // Default to unpaid
  },
  methodOfPayment: {
    type: String,
    default: "not specified", // Default to "not specified"
  },
  balance: {
    type: Number,
    default: 0, // Default to 0 balance
  },
});

const orderSchema = new mongoose.Schema({
  drugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Drug', // Reference to the Drug schema
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  buyer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['order placed', 'order packed', 'in-transit', 'out for delivery', 'pending', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: paymentSchema,
    default: () => ({}), // Default to an empty object, which will apply the default values in paymentSchema
  },
  transportHistory: [transportHistorySchema], // Embedded sub-documents for transport history
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;
