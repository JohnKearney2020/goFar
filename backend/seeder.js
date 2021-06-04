import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import reviews from './data/reviews.js';

//Models
import Product from './models/productModel.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js'; //we aren't seeding oders here, but by importing it we can gain the ability to destroy all Orders if we want
import Review from './models/reviewModel.js';

import connectDB from './config/db.js';

dotenv.config(); //load environmental variables
connectDB(); //connect to our database

//seed the database with data
const importData = async () => {
  try {
    await Order.deleteMany(); //not passing any arguments will delete everything
    await User.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();

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
    const seededProducts = await Product.insertMany(sampleProducts);
    //--- Reviews ---
    // Loop through each of the reviews. Find the matching product and add the product's ID to the review
    for(let review of reviews){
      innerLoop:
      for(let product of seededProducts){
        if(product.name === review.productName){
          review.productID = product._id;
          review.userID = adminUser;
          // console.log(`Found a Match!`)
          break innerLoop; //Move on to the next review
        }
      }
    }
    // .insertMany() is problematic for our reviews because it gives them all an idential timestamp. When we try to sort by createdAt
    // this cause issues b/c createdAt is the same for all reviews. We will use a loop and .create() instead
    // await Review.insertMany(reviews);
    for(let eachReview of reviews){
      await Review.create(eachReview);
    }

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