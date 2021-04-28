import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import connectDB from './config/db.js'; //remember, we need the .js extension in the backend since we are using the ESmodules way of importing
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishListRoutes from './routes/wishListRoutes.js';

dotenv.config(); //load our environmental variables
connectDB(); // connect to our database!

const app = express();

app.use(express.json()); //this allows us to accept JSON data in the body

// Run morgan middleware in development mode only
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//===============================================
//         Parse JSON from Body
//===============================================
app.use(express.json()); //this will allow us to accept JSON data in the body

app.get('/', (req, res) => {
  res.send('API is running...');
})

//========================================
// Product related routes
//========================================
app.use('/api/products', productRoutes);

//========================================
// User related routes
//========================================
app.use('/api/users', userRoutes);

//========================================
// Cart related routes
//========================================
app.use('/api/users/cart', cartRoutes);

//========================================
// WishList related routes
//========================================
app.use('/api/users/wishlist', wishListRoutes);

//========================================
// Paypal
//========================================
app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID));

//========================================
// Error Handling Middleware
//========================================
// 404 fallback - for anything that is not found
app.use(notFound);
app.use(errorHandler);


//===============================================
//               Start the Server
//===============================================
const PORT = process.env.PORT || 5000; //get the port from our .env file
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold));