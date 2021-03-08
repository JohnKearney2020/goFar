import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc     Fetch all Products
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); //passing a blank object will return all products
  //intentionally throw an error
  // res.status(401);
  // throw new Error('not authorized')
  res.json(products);
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