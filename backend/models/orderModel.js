import mongoose from 'mongoose';

const orderNotesSchema = mongoose.Schema({
  comment: { type: String, required: true },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User'
  }, 
}, {
  timestamps: true
});

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  orderItems: [
    {
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: String, required: true },
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Product'
      },
    }
  ],
  shippingAddresses: [{
    addressLine1: { type: String, required: true },
    addressLine2: { type: String, required: false }, //Only need for apartments and such
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    primaryAddress: {
      type: Boolean,
      required: true,
      default: false
    },
    latLng: {
      type: String,
      required: false
    }
  }],
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentResult: { //this data comes from PayPal
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  shipppingPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isShipped: {
    type: Boolean,
    required: true,
    default: false
  },
  shippedAt: {
    type: Date
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false
  },
  cancelledAt: {
    type: Date
  },
  isRefunded: {
    type: Boolean,
    required: true,
    default: false
  },
  refundedAt: {
    type: Date
  },
  orderNotes: [orderNotesSchema] //see schema above
}, {
  //this automatically makes 'CreatedAt' and 'UpdatedAt' fields for us
  timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

export default Order;