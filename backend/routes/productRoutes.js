import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

// @desc     Fetch all Products
// @route    GET /api/products
// @access   Public
router.get('/', asyncHandler(async(req, res) => {
  const products = await Product.find({}); //passing a blank object will return all products
  //intentionally throw an error
  // res.status(401);
  // throw new Error('not authorized')
  res.json(products);
}));

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public
// router.get('/?id=:id&color=:color', asyncHandler(async(req, res) => {
// router.get('/:id&:color', asyncHandler(async(req, res) => {
router.get('/:id', asyncHandler(async(req, res) => {
  // console.log(req.params.id)
  // console.log(req.params.color)
  const product = await Product.findById(req.params.id);
  if(product){
    res.json(product);
  } else {
    //this will be caught by our error handling middleware
    res.status(404); //setting the status is optional. If we don't, it will default to 500
    throw new Error('Product not found');
  }
}));


export default router;