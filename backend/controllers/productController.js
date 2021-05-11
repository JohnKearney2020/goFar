import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc     Fetch all Products
// @route    GET /api/products?keyword=keyword&gender=gender
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  // let keyword = {}; //By default, a blank object will return all

  //===================================================
  //                Format our Keyword
  //===================================================
  // If we do NOT have a gender, but do have a keyword
  // if(!req.query.gender && req.query.keyword){
  //   keyword = {
  //     $or: [
  //       {
  //         name: {
  //           $regex: req.query.keyword,
  //           $options: 'i' // 'i' is for case insensitive
  //         }
  //       },
  //       {
  //         categories: {
  //           $regex: req.query.keyword,
  //           $options: 'i' // 'i' is for case insensitive
  //         }
  //       },
  //       {
  //         subBrand: {
  //           $regex: req.query.keyword,
  //           $options: 'i' // 'i' is for case insensitive
  //         }
  //       }
  //     ]
  //   };
  // };

  const gender = req.query.gender ? req.query.gender : '';
  console.log(`GENDER sent to backend: ${gender}`)
  console.log(`KEYWORD sent to backend: ${req.query.keyword}`)

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
    testCount = await Product.countDocuments({ gender: gender, ...keyword });
    console.log(`Gender testCount: ${testCount}`)
  } else {
    testCount = await Product.countDocuments({ ...keyword });
    console.log(`no gender testCount: ${testCount}`)
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
  // const products = await Product.find({ gender: gender, ...keyword }).limit(pageSize).skip(pageSize * (page - 1)); 
  
  //passing a blank object will return all products
  //intentionally throw an error
  // res.status(401);
  // throw new Error('not authorized')

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

export { getProducts, getProductById };