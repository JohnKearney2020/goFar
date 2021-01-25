import mongoose from 'mongoose';

//Review Schema - Used in the productSchema below
// not 100% sure, but creating a seperate reviewSchema, as opposed to just an array of objects, lets us take advantage of the timestamps
// feature automatically when a review is created. This is useful here b/c we'll want to say the review is from '1-19-2020' etc. You could generate
// timestamps in other ways on review creation, but I think this is the simplest b/c it does it automatically for you.
const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true }, //a single rating from a user's review. Not an average.
  comment: { type: String, required: true },
}, {
  timestamps: true
});

const productSchema = mongoose.Schema({
  //we want to know which user created the product. We do this by setting the 'type' and then the 'ref'
  //the 'ref' references the model where we can find that ObjectId
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  images: [{
    source: {
      type: String,
      required: true,
    },
    isPrimaryImage: {
      type: Boolean,
      required: true,
      default: false
    }
  }],
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema], //an array of review objects. See the schema above
  rating: { //the average of all user ratings
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
}, {
  //this automatically makes 'CreatedAt' and 'UpdatedAt' fields for us
  timestamps: true
})

const Product = mongoose.model('Product', productSchema);

export default Product;