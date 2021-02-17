import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
// import Rating from '../components/ProductRating';
import ProductColors from '../components/ProductColors';
import ProductRating from '../components/ProductRating';
import PriceRanges from '../components/PriceRanges';
import SizeSelector from '../components/SizeSelector';
// import { findDefaultPriceRange, findSalePriceRange } from '../utilityFunctions/priceRanges';
import products from '../products2';

const ProductScreen = ({ match }) => {
  
  const product = products.find((p)=> p._id === match.params.id);
  // let changedSizeCategory = false;

  const [selectedColor, setSelectedColor] = useState(product.colors[0].colorName);
  // const [primaryImage, setPrimaryImage] = useState(product.images[0].source);
  const [primaryImage, setPrimaryImage] = useState(product.images.filter(eachObj => (eachObj.color === selectedColor))[0].source);
  const [selectedSizeCategory, setSelectedSizeCategory] = useState(product.sizes[0].sizeCategoryName || '');
  // const [selectedSize, setSelectedSize] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [changedSizeCategoryToggler, setChangedSizeCategoryToggler] = useState(false);


  const colorSelectHandler = (colorClicked) => {
    let previousColor = selectedColor;
    //Find the image that corresponds to the color clicked
    setSelectedColor(colorClicked);
    for(let eachImage of product.images) {
      if(eachImage.color === colorClicked  && eachImage.isPrimaryImage === true){
        setPrimaryImage(eachImage.source);
        break;
      }
    }

    //Check to see if the current size selected is not available in the new color. If it isn't, reset the local state of selectedSize to ''
    let sizeFound = false;
    for(let eachSizeCategory of product.sizes){ // Loop thru the array of general size objects
      if(eachSizeCategory.sizeCategoryName === selectedSizeCategory){ // Find the matching sizeCategory, 'Tall' or 'Regular'
        for(let eachColor of eachSizeCategory.sizeCategoryColorsAndSizes){ // Loop thru the array of more specific size objects
          if(eachColor.color === colorClicked){ // Find a color that matches
            for(let eachSize of eachColor.sizeCategorySizes){ // Loop thru the final array - an array of sizes and quantities
              if(eachSize.size === selectedSize && eachSize.qty !== 0){
                sizeFound = true;
              }
            }
          }
        }
        break; //We've found the sizes for the color and can exit this loop
      }
    };
    if(sizeFound === false) { setSelectedSize('') }
  }

  const sizeCategoryHandler = (e) => {
    console.log(`Clicked size category: ${e.target.value}`);
    //If we are changing size categories we need to clear the selectedSize state entirely to reset it, i.e. 'Regular' to 'Tall', or vice versa
    if(e.target.value !== selectedSizeCategory) { setSelectedSize('') }
    setSelectedSizeCategory(e.target.value);
    setChangedSizeCategoryToggler(!changedSizeCategoryToggler);
  }

  const sizeSelectHandler = (e) => {
    setSelectedSize(e.target.value);
  }

  // console.log(product.sizes.sizeCategoryColorsAndSizes[0].color);
  // console.log(product.sizes[0].sizeCategoryColorsAndSizes[0].color);


  return (
    <>
      <Row>
        {/* Primary Product Image - Left side of page */}
        <Col md={6}>
          <Image src={primaryImage} alt={product.name} fluid/>
        </Col>
        {/* Product Name / Sizes / Colors - Right side of page */}
        <Col md={6}>
          <Card border="light"> {/* light removes the border */}
            <ListGroup variant='flush'>
              <ListGroup.Item className='border-0 pb-0'>
                {product.subBrand ?? <h6>{product.subBrand}</h6>}                
              </ListGroup.Item>
              <ListGroup.Item className='border-0'>
                <h4>{product.name}</h4>
              </ListGroup.Item>
            </ListGroup>
            {/* Prices and Reviews */}
            <ListGroup horizontal className='justify-content-between'>
              <ListGroup.Item className='border-0'>
                <PriceRanges product={product}/>
              </ListGroup.Item>
              <ListGroup.Item className='border-0'>
                <ProductRating value={product.rating} text={`${product.numReviews} reviews`}/>
              </ListGroup.Item>
            </ListGroup>
            {/* Size Categories */}
            <ListGroup horizontal defaultActiveKey='0' className='px-2'>
              {product.sizes.map((eachSize,idx) =>
                <ListGroup.Item action eventKey={idx} className='text-center' onClick={sizeCategoryHandler} value={eachSize.sizeCategoryName}>
                  {eachSize.sizeCategoryName}
                </ListGroup.Item>
              )}
            </ListGroup>
            {/* Selected Color & Product Colors */}
            <ListGroup>
              <ListGroup.Item className='border-0'>Color: {<span className='font-weight-bold'>{selectedColor}</span>}</ListGroup.Item>
              {/* Product Colors */}
              <ListGroup.Item className='border-0'>
                <ProductColors images={product.colors} colorSelectHandler={colorSelectHandler} selectedColor={selectedColor}/>
              </ListGroup.Item>
            </ListGroup>
            {/* Size Selected & Sizes */}
            <ListGroup.Item className='border-0'>
              Size: 
            </ListGroup.Item>
            <ListGroup horizontal defaultActiveKey=''>
              {/* {product.sizes.sizeCategoryColorsAndSizes[{selectedColor}].map((eachSize,idx) =>
                <ListGroup.Item action eventKey={idx} className='text-center'>
                  {eachSize.sizeCategoryName}
                </ListGroup.Item>
              )} */}
              <SizeSelector 
                product={product} 
                selectedSizeCategory={selectedSizeCategory} 
                selectedColor={selectedColor} 
                sizeSelectHandler={sizeSelectHandler}
                changedSizeCategoryToggler={changedSizeCategoryToggler}
              />
            </ListGroup>
          </Card>
        </Col>{/* End of Product Name / Sizes / Colors */}

      </Row>
    </>
  )
}

export default ProductScreen;
