import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';

// @desc     Get all orders tied to a specific user
// @route    GET /api/reviews
// @query    ?productID=&pageNumber=&totalRating=
// @access   Public
const getReviewByProductId = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  let totalRating = Number(req.query.totalRating) || -1;
  const productID = req.query.productID;

  //Get the total count for pagination purposes
  const count = await Review.countDocuments({ productID: productID });

  //Get the total rating average based on all reviews
  //We only do this if a total rating is not sent with the request. That way during pagination we aren't recalculating the same total
  //rating with each pagination request
  if(totalRating === -1){
    const calcRatingReviews = await Review.find({ productID: productID }); //Find all reviews that match that product ID
    if(calcRatingReviews && calcRatingReviews.length > 0){
      let ratingSumTotal = 0;
      for(let review of calcRatingReviews){
        ratingSumTotal += review.rating;
      }
      totalRating = Number((ratingSumTotal / count).toFixed(2));
    } else {
      totalRating = 0; //The product has no reviews yet OR the fetch to our database failed
    }
  }

  // '-1' is descending order from newest to oldest. '1' is ascending order from oldest to newest
  const reviews = await Review.find({  productID: productID }).sort({createdAt: -1}).limit(pageSize).skip(pageSize * (page - 1));
  if(reviews){
    // We return what the current page is, and how many pages total their are rounded up
    res.json({ reviews, page, pages: Math.ceil(count / pageSize), totalRating, totalReviews: count });
  } else {
    res.status(400);
    throw new Error('Could not find reviews based on that product ID...');
  }
})

export { 
  getReviewByProductId
};

