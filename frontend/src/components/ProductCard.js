import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import './ProductCard.css';
import { Link } from 'react-router-dom';

const sortLowToHigh = (num1, num2) => {
  return num1 - num2;
}

// product.sizes.sizeCategories
const findDefaultPriceRange = (arrayOfPrices) => {
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
      if(eachColor.colorSalePrice !== 0) prices.push(eachColor.colorSalePrice);
    }
  }
  prices.sort(sortLowToHigh);
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

  //Set up Local State
  const [selectedColor, setSelectedColor] = useState('');
  const [primaryImage, setPrimaryImage] = useState('');
  console.log(`selected color to start is: ${selectedColor}`);

  //On component load...
  useEffect(() => {
    setSelectedColor(product.colors[0].colorName);
    setPrimaryImage(product.images[0].source);
  }, [product.colors, product.images]);

  const colorSelectHandler = (colorClicked) => {
    //Find the image that corresponds to the color clicked
    for(let eachImage of product.images) {
      if(eachImage.color === colorClicked  && eachImage.isPrimaryImage === true){
        setPrimaryImage(eachImage.source);
        break;
      }
    }
  }


  return (
    <Card className='my-3 rounded' style={{ width: '365px' }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={primaryImage} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title className={`my-0 font-weight-bold`}>
            {product.name}
          </Card.Title>
        </Link>
        {<Card.Text as='h6' className={`my-0`} id='productCardPrices'>
          {salePriceRange.length === 0 ? <span>{defaultPriceString}</span> : 
          salePriceRange.length === 1 ? <span><s>{defaultPriceString}</s> <span className='text-danger'>{salePriceString}</span></span> : 
          <span><s>{defaultPriceString}</s> <span className='text-danger' id='productCardSalePrices'>{salePriceString}</span></span>}
        </Card.Text>}
        <Card.Text as='div'>{product.colors.length} colors</Card.Text>
        <Card.Text as='div'>
          <ProductRating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        <hr></hr>
        <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} selectedColor={selectedColor}/>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
