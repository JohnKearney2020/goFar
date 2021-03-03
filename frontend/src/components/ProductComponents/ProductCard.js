import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import PriceRanges from './PriceRanges';
import './ProductCard.css';
import { Link } from 'react-router-dom';
import { findDefaultPriceRange, findSalePriceRange } from '../../utilityFunctions/priceRanges';

//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {
  let defaultPriceRange = findDefaultPriceRange(product.sizes);
  let salePriceRange = findSalePriceRange(product.sizes);
  let defaultPriceString = '';
  let salePriceString = '';
  // Find the string to represent the range of default prices, ex: '$59.99 - $69.99'
  defaultPriceRange.length > 1 ? defaultPriceString = `$${defaultPriceRange[0]} - $${defaultPriceRange[defaultPriceRange.length - 1]}` :
  // eslint-disable-next-line
  defaultPriceString = `$${defaultPriceRange[0]}`;

  // Find the string to represent the range of sale prices, ex: '$59.99 - $69.99'
  salePriceRange.length > 1 ? salePriceString = `$${salePriceRange[0]} - $${salePriceRange[salePriceRange.length - 1]}` :
  // eslint-disable-next-line
  salePriceString = `$${salePriceRange[0]}`;

  //Set up Local State
  const [selectedColor, setSelectedColor] = useState(product.colors[0].colorName);
  let imageObjArray = product.images;
  const [primaryImage, setPrimaryImage] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
  // test for primary image
  // console.log(imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source)

  const colorSelectHandler = (colorClicked) => {
    //Find the image that corresponds to the color clicked
    if(product.colors.length > 1 && colorClicked !== selectedColor) {
    setPrimaryImage(imageObjArray[imageObjArray.findIndex(index => index.color === colorClicked)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
    }
    //Update the selectedColor state
    setSelectedColor(colorClicked);
  }


  return (
    // <Card className='my-3 p-3 rounded' style={{ width: '365px' }}>
    <Card className='my-3 rounded'>
      <Link to={`/product/${product._id}/${selectedColor}`}>
        <Card.Img src={primaryImage} variant='top' />
      </Link>
      <Card.Body className=''>
        <Link to={`/product/${product._id}/${selectedColor}`}>
          <Card.Title className='my-0 font-weight-bold'>
            {product.name}
          </Card.Title>
        </Link>
        {<Card.Text as='h6' className='my-0' id='productCardPrices'>
          <PriceRanges product={product}/>
        </Card.Text>}
        <Card.Text as='div'>{product.colors.length} colors</Card.Text>
        <Card.Text as='div'>
          <ProductRating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? `review` : `reviews`}`}/>
        </Card.Text>
        <hr></hr>
        <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} productColorsArray={product.colors}/>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
