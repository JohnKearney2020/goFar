import mongoose from 'mongoose';
import { addressSchema, cartSchema } from './sharedSchemas.js';

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

const latLngSchema = mongoose.Schema({
  latLng: { 
    type: mongoose.Schema.Types.Mixed, 
    required: false,
    default: null
  }, 
});

// ===============================================================================================================
//                                                      The Order Schema
// ===============================================================================================================
const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  paymentMethodID: {
    type: String,
    required: true
  },
  items: [cartSchema], //We share the same schema, cartSchema, created in userModel.js
  subTotal: {
    type: Number,
    required: true
  },
  shippingCost: {
    type: Number,
    required: true
  },
  cartTotal: {
    type: Number,
    required: true
  },
  itemTally: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  shippingAddressLatLng: {
    type: mongoose.Schema.Types.Mixed, 
    required: false,
    default: null
  },
  shippingAddressString: {
    type: String,
    required: true
  },
  shipped: {
    type: Boolean,
    required: true,
    default: false
  },
  shippedAt: {
    type: Date,
    required: false
  },
  isCancelled: {
    type: Boolean,
    required: true,
    default: false
  },
  cancelledAt: {
    type: Date,
    required: false
  },
  isRefunded: {
    type: Boolean,
    required: true,
    default: false
  },
  refundedAt: {
    type: Date,
    required: false
  },
}, 
{
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;


// const orderNotesSchema = mongoose.Schema({
//   comment: { type: String, required: true },
//   user: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     required: true,
//     ref: 'User'
//   }, 
// }, {
//   timestamps: true
// });

// const latLngSchema = mongoose.Schema({
//   latLng: { 
//     type: mongoose.Schema.Types.Mixed, 
//     required: false,
//     default: null
//   }, 
// });

// const orderSchema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
//   },
//   orderItems: [
//     {
//       name: { type: String, required: true },
//       qty: { type: Number, required: true },
//       image: { type: String, required: true },
//       price: { type: String, required: true },
//       product: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         required: true,
//         ref: 'Product'
//       },
//     }
//   ],
//   billingAddress: [{
//     addressLine1: { type: String, required: true },
//     addressLine2: { type: String, required: false }, //Only need for apartments and such
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     primaryAddress: {
//       type: Boolean,
//       required: true,
//       default: false
//     }
//   }],
//   shippingAddress: [{
//     addressLine1: { type: String, required: true },
//     addressLine2: { type: String, required: false }, //Only need for apartments and such
//     city: { type: String, required: true },
//     state: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     primaryAddress: {
//       type: Boolean,
//       required: true,
//       default: false
//     }
//   }],
//   shippingAddressLatLng: latLngSchema,
//   paymentMethod: {
//     type: String,
//     required: true,
//   },
//   paymentResult: { //this data comes from PayPal
//     id: { type: String },
//     status: { type: String },
//     update_time: { type: String },
//     email_address: { type: String },
//   },
//   taxPrice: {
//     type: Number,
//     required: true,
//     default: 0.0
//   },
//   shipppingPrice: {
//     type: Number,
//     required: true,
//     default: 0.0
//   },
//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0.0
//   },
//   isPaid: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   paidAt: {
//     type: Date
//   },
//   isShipped: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   shippedAt: {
//     type: Date
//   },
//   isCancelled: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   cancelledAt: {
//     type: Date
//   },
//   isRefunded: {
//     type: Boolean,
//     required: true,
//     default: false
//   },
//   refundedAt: {
//     type: Date
//   },
//   orderNotes: [orderNotesSchema] //see schema above
// }, {
//   //this automatically makes 'CreatedAt' and 'UpdatedAt' fields for us
//   timestamps: true
// })

// const Order = mongoose.model('Order', orderSchema);

// export default Order;




