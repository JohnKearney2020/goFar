import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import './ProductCard.css';

const findLowestPrice = (arr) => {
  let lowestPrice = Infinity;
  for(let eachIndex of arr){
    lowestPrice = Math.min(lowestPrice, eachIndex.colorPrice);
  }
  return lowestPrice;
}


//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {

  let lowestSalePrice = findLowestPrice(product.colors);

  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.images[0].source} variant='top' />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as='div'>
          <ProductRating value={product.rating} text={`${product.numReviews} reviews`}/>
        </Card.Text>
        {/* <Card.Text as='h3' className='productCardPrice'>${product.defaultPrice}</Card.Text> */}
        {/* <Card.Text as='h3' className='productCardPrice'>${product.colors[0].colorPrice}</Card.Text> */}
        <Card.Text as='h3' className='productCardPrice'>${lowestSalePrice}</Card.Text>
        <ProductColors images={product.colors}/>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
