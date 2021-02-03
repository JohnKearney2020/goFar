import React from 'react';
import { Card } from 'react-bootstrap';
import ProductRating from './ProductRating';
import ProductColors from './ProductColors';
import './ProductCard.css';

const findSalePrices = (arrayOfPrices, defaultPrice) => {
  // let lowestPrice = Infinity;
  // for(let eachIndex of arr){
  //   lowestPrice = Math.min(lowestPrice, eachIndex.colorPrice);
  // }
  // return lowestPrice;
  const sortLowToHigh = (num1, num2) => {
    return num1 - num2;
  }
  let salePrices = [];
  for(let eachIndex of arrayOfPrices){
    if(eachIndex.colorPrice < defaultPrice) { salePrices.push(eachIndex.colorPrice) };
  }
  if(salePrices.length > 1) { salePrices.sort(sortLowToHigh) };
  return salePrices;
}


//remember, we are using destructuring here in place of passing 'props' and then 'props.product' etc. in our component
const ProductCard = ({ product }) => {

  // let lowestSalePrice = findLowestPrice(product.colors);
  let salePrices = findSalePrices(product.colors, product.defaultPrice);
  console.log(salePrices);

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
        {/* {salePrices.length === 0 ? 
          <Card.Text as='h3' className='productCardPrice'>${product.defaultPrice}</Card.Text> :
          } */}

        {<Card.Text as='h5' className='productCardPrice'>
          {salePrices.length === 0 ? <span>${product.defaultPrice}</span> : 
          salePrices.length === 1 ? <span><s>${product.defaultPrice}</s> <span className='text-danger'>${salePrices[0]}</span></span> : 
          <span><s>${product.defaultPrice}</s> <span className='text-danger'>${salePrices[0]} - ${salePrices[salePrices.length - 1]}</span></span>}
        </Card.Text>}

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
