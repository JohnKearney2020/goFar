import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';

//Models
import Product from './models/productModel.js';
import { User } from './models/userModel.js';
import Order from './models/orderModel.js'; //we aren't seeding oders here, but by importing it we can gain the ability to destroy all Orders if we want

import connectDB from './config/db.js';

dotenv.config(); //load environmental variables
connectDB(); //connect to our database

//seed the database with data
const importData = async () => {
  try {
    await Order.deleteMany(); //not passing any arguments will delete everything
    await User.deleteMany();
    await Product.deleteMany();

    //--- Users ---
    //We store our created users in a variable as an array of created users. We do this b/c our products are tied to the user that created them,
    //and we want to add the admin as the user that created each product in the products code below
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; //in users.js we set the first user to be the admin

    //--- Products ---
    //add the admin user to each product
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser}
    })
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); //1 - exit with failure
  }
}

//seed the database with data
const destroyData = async () => {
  try {
    await Order.deleteMany(); //not passing any arguments will delete everything
    await User.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); //1 - exit with failure
  }
}

if(process.argv[2] === '-d'){ //see notes below on '-d'
  destroyData(); //delete our data
} else {
  importData(); //seed our data
}

//--- How to Run this file ---
// we created scripts to run this in our 'package.json' file
// 'npm run data:import'
// 'npm run data:destroy'


//--- To Import ---
// run 'node backend/seeder'

//--- To Destroy ---
// run 'node backend/seeder -d'