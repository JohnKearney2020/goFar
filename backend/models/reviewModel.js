import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({  //we want to know which product is tied to this review
  //the 'ref' references the model where we can find that ObjectId
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  productName: { type: String, required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true }, //a single rating from a user's review. Not an average.
  title: { type: String, required: true },
  review: { type: String, required: true },
  verified: { type: Boolean, required: true },
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;