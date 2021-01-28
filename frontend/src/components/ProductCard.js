import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import './ProductCard.css';

//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
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
        <Card.Text as='h3' className='productCardPrice'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProductCard;
