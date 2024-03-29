import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const pageSize = 8;

// @desc     Fetch all Products
// @route    GET /api/products?keyword=keyword&gender=gender&pageNumber=pageNumber
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const gender = req.query.gender ? req.query.gender : '';

  const keyword = req.query.keyword ? {
    $or: [
      {
        name: {
          $regex: req.query.keyword,
          $options: 'i' // 'i' is for case insensitive
        }
      },
      {
        categories: {
          $regex: req.query.keyword,
          $options: 'i' // 'i' is for case insensitive
        }
      },
      {
        subBrand: {
          $regex: req.query.keyword,
          $options: 'i' // 'i' is for case insensitive
        }
      }
    ]
  } : {};

  //Get the total count for pagination purposes
  // const count = await Product.countDocuments({ ...keyword });
  let count;
  if(gender){
    count = await Product.countDocuments({ gender: gender, ...keyword });
  } else {
    count = await Product.countDocuments({ ...keyword });
  }

  // .limit() limits our results to the number we've specified in pageSize
  // .skip() will skip the first x results and start returning results after that. Here, for page 1 we skip 0
  // for page 2 we skip the first 10 results that would have already been displayed on page 1
  // for page 3 we skip the first 20 results that would have already been displayed on page 1 and page 2
  let products;
  if(gender){ //If we have a gender sent from the front end
    products = await Product.find({ gender: gender, ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
  } else { //If we do not have a gender sent from the front end
    products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));
  }

  //passing a blank object will return all products
  //intentionally throw an error
  // res.status(401);
  // throw new Error('not authorized')

  // We return what the current page is, and how many pages total their are rounded up
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
})


// @desc     Fetch all Products for a specific Gender 
// @route    GET /api/products/gender/all?pageNumber=pageNumber
// @access   Public
const getGenderProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const gender = req.params.gender;
  //Get the total count for pagination purposes
  let count = await Product.countDocuments({ gender: gender });
  let products = await Product.find({ gender: gender }).limit(pageSize).skip(pageSize * (page - 1));
  // We return what the current page is, and how many pages total their are rounded up
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
})

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public
// router.get('/?id=:id&color=:color', asyncHandler(async(req, res) => {
// router.get('/:id&:color', asyncHandler(async(req, res) => {
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product){
    res.json(product);
  } else {
    //this will be caught by our error handling middleware
    res.status(404); //setting the status is optional. If we don't, it will default to 500
    throw new Error('Product not found');
  }
})

export { getProducts, getGenderProducts, getProductById };