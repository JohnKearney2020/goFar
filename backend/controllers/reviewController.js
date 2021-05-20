import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';

// @desc     Get all orders tied to a specific user
// @route    GET /api/reviews
// @query    ?productID=&pageNumber=
// @access   Public
const getReviewByProductId = asyncHandler(async (req, res) => {
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;
  const productID = req.query.productID;
  //Get the total count for pagination purposes
  const count = await Review.countDocuments({ productID: productID });
  // '-1' is descending order from newest to oldest. '1' is ascending order from oldest to newest
  const reviews = await Review.find({  productID: productID }).sort({createdAt: -1}).limit(pageSize).skip(pageSize * (page - 1));
  if(reviews){
    // We return what the current page is, and how many pages total their are rounded up
    res.json({ reviews, page, pages: Math.ceil(count / pageSize) });
  } else {
    res.status(400);
    throw new Error('Could not find reviews based on that product ID...');
  }
})

export { 
  getReviewByProductId
};

