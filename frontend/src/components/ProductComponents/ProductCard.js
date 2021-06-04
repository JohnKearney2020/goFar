import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import PriceRanges from './PriceRanges';
import './ProductCard.css';
import { Link } from 'react-router-dom';

//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {

  //Set up Local State
  const [selectedColor, setSelectedColor] = useState(product.colors[0].colorName);
  let imageObjArray = product.images;
  const [primaryImage, setPrimaryImage] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);

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
      <Link to={`/product/${product._id}/${selectedColor}`} >
        <Card.Img src={primaryImage} variant='top' />
      </Link>
      <Card.Body className=''>
        <Link to={`/product/${product._id}/${selectedColor}`} >
          <Card.Title className='my-0 font-weight-bold'>
            {product.name}
          </Card.Title>
        </Link>
        {<Card.Text as='h6' className='my-0' id='productCardPrices'>
          <PriceRanges product={product}/>
        </Card.Text>}
        <Card.Text as='div'>{product.colors.length} colors</Card.Text>
        <Card.Text as='div'>
          <ProductRating />
        </Card.Text>
        <hr></hr>
        <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} productColorsArray={product.colors}/>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
