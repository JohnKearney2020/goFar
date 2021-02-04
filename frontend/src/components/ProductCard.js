import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import './ProductCard.css';

const sortLowToHigh = (num1, num2) => {
  return num1 - num2;
}

// product.sizes.sizeCategories
const findDefaultPriceRange = (arrayOfPrices) => {
  console.log(arrayOfPrices)
  let prices = [];
  for(let eachSizeCategory of arrayOfPrices){
    prices.push(eachSizeCategory.sizeCategoryDefaultPrice);
  }
  prices.sort(sortLowToHigh);
  return prices;
}
// product.sizes.sizeCategories.sizeCategoryColorsAndSizes
const findSalePriceRange = (arrayOfPrices) => {
  let prices = [];
  for(let eachSizeCategoryName of arrayOfPrices){
    for(let eachColor of eachSizeCategoryName.sizeCategoryColorsAndSizes){
      // console.log(eachColor)
      if(eachColor.colorSalePrice !== 0) prices.push(eachColor.colorSalePrice);
    }
    // console.log(eachSizeCategoryName);
  }
  prices.sort(sortLowToHigh);
  // console.log(prices)
  return prices;
}

//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {
  let defaultPriceRange = findDefaultPriceRange(product.sizes);
  let salePriceRange = findSalePriceRange(product.sizes);
  let defaultPriceString = '';
  let salePriceString = '';
  // Find the string to represent the range of default prices, ex: '$59.99 - $69.99'
  defaultPriceRange.length > 1 ? defaultPriceString = `$${defaultPriceRange[0]} - $${defaultPriceRange[defaultPriceRange.length - 1]}` :
  defaultPriceString = `$${defaultPriceRange[0]}`;

  // Find the string to represent the range of sale prices, ex: '$59.99 - $69.99'
  salePriceRange.length > 1 ? salePriceString = `$${salePriceRange[0]} - $${salePriceRange[salePriceRange.length - 1]}` :
  salePriceString = `$${salePriceRange[0]}`;

  return (
    <Card className='my-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.images[0].source} variant='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        {/* {salePrices.length === 0 ? 
          <Card.Text as='h3' className='productCardPrice'>${product.defaultPrice}</Card.Text> :
          } */}

        <Card.Text as='h3' className='productCardPrice'>{defaultPriceString}</Card.Text>

        {/* {<Card.Text as='h6' className='productCardPrice'>
          {salePriceRange.length === 0 ? <span>${product.defaultPrice}</span> : 
          salePrices.length === 1 ? <span><s>${product.defaultPrice}</s> <span className='text-danger'>${salePrices[0]}</span></span> : 
          <span><s>${product.defaultPrice}</s> <span className='text-danger'>${salePrices[0]} - ${salePrices[salePrices.length - 1]}</span></span>}
        </Card.Text>} */}
        <Card.Text as='div'>{product.colors.length} colors</Card.Text>
        <Card.Text as='div'>
          <ProductRating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        <hr></hr>
        {/* <Card.Text as='h3' className='productCardPrice'>${product.colors[0].colorPrice}</Card.Text> */}
        {/* {lowestSalePrice < product.defaultPrice ?
          <Card.Text as='h5' className='productCardPrice'><s>${product.defaultPrice}</s><span className="text-danger"> ${lowestSalePrice}</span></Card.Text> :
          <Card.Text as='h5' className='productCardPrice'>${product.defaultPrice}</Card.Text>
        } */}
        <ProductColors images={product.colors}/>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
