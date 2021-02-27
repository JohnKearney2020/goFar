import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import PriceRanges from './PriceRanges';
import './ProductCard.css';
import { Link } from 'react-router-dom';
// import { sortLowToHigh } from '../utilityFunctions/sortingFunctions';
import { findDefaultPriceRange, findSalePriceRange } from '../utilityFunctions/priceRanges';

//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {
  let defaultPriceRange = findDefaultPriceRange(product.sizes);
  let salePriceRange = findSalePriceRange(product.sizes);
  // eslint-disable-next-line no-unused-vars
  let defaultPriceString = '';
  let salePriceString = '';
  // Find the string to represent the range of default prices, ex: '$59.99 - $69.99'
  defaultPriceRange.length > 1 ? defaultPriceString = `$${defaultPriceRange[0]} - $${defaultPriceRange[defaultPriceRange.length - 1]}` :
  defaultPriceString = `$${defaultPriceRange[0]}`;

  // Find the string to represent the range of sale prices, ex: '$59.99 - $69.99'
  salePriceRange.length > 1 ? salePriceString = `$${salePriceRange[0]} - $${salePriceRange[salePriceRange.length - 1]}` :
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
      console.log(`in colorSelectHandler. colorClicked: ${colorClicked}`)
    setPrimaryImage(imageObjArray[imageObjArray.findIndex(index => index.color === colorClicked)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
    }
    //Update the selectedColor state
    setSelectedColor(colorClicked);
  }


  return (
    // <Card className='my-3 p-3 rounded' style={{ width: '365px' }}>
    <Card className='my-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={primaryImage} variant='top' />
      </Link>
      <Card.Body className=''>
        <Link to={`/product/${product._id}`}>
          <Card.Title className='my-0 font-weight-bold'>
            {product.name}
          </Card.Title>
        </Link>
        {<Card.Text as='h6' className='my-0' id='productCardPrices'>
          <PriceRanges product={product}/>
          {/* {salePriceRange.length === 0 ? <span>{defaultPriceString}</span> : 
          salePriceRange.length === 1 ? <span><s>{defaultPriceString}</s> <span className='text-danger'>{salePriceString}</span></span> : 
          <span><s>{defaultPriceString}</s> <span className='text-danger' id='productCardSalePrices'>{salePriceString}</span></span>} */}
        </Card.Text>}
        <Card.Text as='div'>{product.colors.length} colors</Card.Text>
        <Card.Text as='div'>
          <ProductRating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        <hr></hr>
        {/* <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} selectedColor={selectedColor}/> */}
        <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} />
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
