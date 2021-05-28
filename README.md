# Go Far Retail Outerwear Website

Go Far is a fully functional retail website built with the MERN stack. It is heavily inspired by EddieBauer.com. Users can search for and browse products, 
add them to their cart or wishlist, and conduct transactions via the PayPal API

![Landing Page](/frontend/public/images/markdown/landingPage.png)
<br />

See the live website [here](https://gofarapp.herokuapp.com/)

### Built With
Frontend | Backend
------------ | -------------
React | MongoDB
Redux | Mongoose
React Bootstrap | Express
 &nbsp; | Node
 
### Features
*Robust Product Model*
- A robust product [model](/backend/models/productModel.js) allows the database to store products with many different sizes, colors, size categories (petite, tall, plus, etc.), along with unique prices and images for each possible combination
- An example of a product based on this model is shown below:

<p align="center">
  <img width="" src="frontend/public/images/markdown/product.png">
</p>
<br />

- This same product on the [Eddie Bauer website](https://www.eddiebauer.com/p/23151062/women's-guide-pro-pants?sp=1&color=Dusty%20Sage&size=)
<br />

*Athorization Middleware*
- When users log in a JSON Web Token is created
- Athorization middleware looks for that token when users try to access protected routes

<p align="center">
  <img width="" src="frontend/public/images/markdown/authMiddleware.png">
</p>
<br />
