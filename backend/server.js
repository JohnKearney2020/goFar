import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import connectDB from './config/db.js'; //remember, we need the .js extension in the backend since we are using the ESmodules way of importing
import products from './data/products.js';

dotenv.config(); //load our environmental variables
connectDB(); // connect to our database!

const app = express();
// Run morgan middleware in development mode only
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is running...');
})

app.get('/api/products', (req, res) => {
  res.json(products);
})


//===============================================
//         Parse JSON from Body
//===============================================
app.use(express.json()); //this will allow us to accept JSON data in the body



//===============================================
//               Start the Server
//===============================================
const PORT = process.env.PORT || 5000; //get the port from our .env file
app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}` .yellow.bold));