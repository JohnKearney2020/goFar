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

*Dynamic Product Image Carousel*
- Images populate based on the colors selected by the user
- Hovering over the featured image gives users a zoom in view of the product
- This was acomplished using [Pure React Carousel](https://github.com/express-labs/pure-react-carousel) by Express Labs

<p align="center">
  <img width="" src="frontend/public/images/markdown/imageCarousel.gif">
</p>
<br />

*Product Reviews*
- Users can add product reviews
- If they've purchased the product the review will be marked as "Verified Purchase"
- A user's rating immediately counts toward the products total rating and total reviews
- A warning message is displayed if users try to review a product they have already reviewed

<p align="center">
  <img width="" src="frontend/public/images/markdown/reviews2.jpg">
</p>
<br />

*Search Functionality*
- Users can search for product names or for broader product categories like "camping" and "leggings"

<p align="center">
  <img width="" src="frontend/public/images/markdown/searchResult2.jpg">
</p>
<br />

*User Profiles*
- Users can change their name, email, phone number and passwords
- Users can add, edit, and delete their addresses
- Users can browse their order history and see a Google Map of their shipping address
<p align="center">
  <img width="" src="frontend/public/images/markdown/profileInformation.png">
</p>
<p align="center">
  <img width="" src="frontend/public/images/markdown/addresses.png">
</p>
<p align="center">
  <img width="" src="frontend/public/images/markdown/orders.png">
</p>
<br />

*User Wishlist*
- Users can add products to their wishlist. From there they can delete them or move them to the cart
- If an item is already in their cart the wishlist will display that to the user
<p align="center">
  <img width="" src="frontend/public/images/markdown/wishlist.png">
</p>
<br />

*Cart*
- Users can add and remove items from their cart, change the quantities, save the item for later, or move them to their wishlist (if it's not already in it)
- The cart checks to see if the items are still in stock and if any quantity changes are needed. Out of stock items are automatically saved for later. Any changes to the cart are relayed to the user.

<p align="center">
  <img width="" src="frontend/public/images/markdown/cart.png">
</p>
<p align="center">
  <img width="" src="frontend/public/images/markdown/savedForLater.png">
</p>
<br />

*Checkout*
- Users can place orders using the PayPal API and PayPal's sandbox mode
- Users can add shipping and/or billing addresses if need during the checkout process

<p align="center">
  <img width="" src="frontend/public/images/markdown/checkout.png">
</p>
<br />



