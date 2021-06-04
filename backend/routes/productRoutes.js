import express from 'express';
const router = express.Router();
import { getProducts, getProductById, getGenderProducts } from '../controllers/productController.js';

// Root url: /api/products
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/:gender/all').get(getGenderProducts);


export default router;