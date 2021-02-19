import React, { useState } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import ProductColors from '../components/ProductColors';
import ProductRating from '../components/ProductRating';
import PriceRanges from '../components/PriceRanges';
import SizeSelector from '../components/SizeSelector';
import products from '../products2';

const ProductScreen = ({ match }) => { //the match prop is needed to pull the id from the URL
  
  const product = products.find((p)=> p._id === match.params.id);

  const [selectedColor, setSelectedColor] = useState(product.colors[0].colorName);
  const [primaryImage, setPrimaryImage] = useState(product.images.filter(eachObj => (eachObj.color === selectedColor))[0].source);
  const [selectedSizeCategory, setSelectedSizeCategory] = useState(product.sizes[0].sizeCategoryName || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [qtyInStock, setQtyInStock] = useState('');
  const [qtyForCart, setQtyForCart] = useState(0);

  const colorSelectHandler = (colorClicked) => {
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
                //We've found that the size is in fact in stock for the new color. Update the local qtyInStock state, too
                console.log(`Found this qty: ${eachSize.qty}`)
                setQtyInStock(eachSize.qty);
              }
            }
          }
        }
        break; //We've found the sizes for the color and can exit this loop
      }
    };
    if(sizeFound === false) { //If the size is not found in the new color, reset the selectedSize and qtyInStock local state
      setSelectedSize('');
      setQtyInStock('');
    }
  }

  const sizeCategoryHandler = (e) => {
    //If we are changing size categories we need to clear the selectedSize state entirely to reset it, i.e. from 'Regular' to 'Tall', or vice versa
    //We also want to reset activeKey to clear any size buttons that the user selected
    if(e.target.value !== selectedSizeCategory) { setSelectedSize('') }
    setSelectedSizeCategory(e.target.value);
    setActiveKey('');
    setQtyInStock(''); //since we are clearing out any size selections, we need to clear the qtyInStock local state, too.
  }

  const sizeSelectHandler = (e) => {
    let userSelectedSize = e.target.value;
    setSelectedSize(userSelectedSize); //Change the local state for selectedSize to reflect the size the user chose
    setActiveKey(e.target.dataset.keyforactivekey); //Make the corresponding size button the user clicked active

    for(let eachSizeCategory of product.sizes){ // Loop thru the array of general size objects
      if(eachSizeCategory.sizeCategoryName === selectedSizeCategory){ // Find the matching sizeCategory, 'Tall' or 'Regular'
        for(let eachColor of eachSizeCategory.sizeCategoryColorsAndSizes){ // Loop thru the array of more specific size objects
          if(eachColor.color === selectedColor){ // Find a color that matches
            for(let eachSize of eachColor.sizeCategorySizes){ // Loop thru the final array - an array of sizes and quantities
              if(eachSize.size === userSelectedSize && eachSize.qty !== 0){
                // sizeFound = true;
                //We've found that the size is in fact in stock for the new color. Update the local qtyInStock state, too
                console.log(`Found this qty: ${eachSize.qty}`)
                setQtyInStock(eachSize.qty);
              }
            }
          }
        }
        break; //We've found the sizes for the color and can exit this loop
      }
    };
  }

  const addToCartHandler = () => {
    console.log(`Clicked add to cart!`)
  }

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
                <ListGroup.Item
                // as='button'
                action 
                eventKey={idx} 
                key={idx} 
                className='text-center' 
                onClick={sizeCategoryHandler} 
                value={eachSize.sizeCategoryName}
                // variant="light"
                // variant="dark"
                >
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
            <ListGroup>
              <ListGroup.Item className='border-0'>
                Size: {<span className='font-weight-bold'>{selectedSize}</span>}
              </ListGroup.Item>
            </ListGroup>
            {/* Size Selector */}
            <SizeSelector 
              product={product} 
              selectedSizeCategory={selectedSizeCategory} 
              selectedColor={selectedColor} 
              sizeSelectHandler={sizeSelectHandler}
              activeKey={activeKey}
            />
            {/* Qty Select and Add to Cart Button */}
            <ListGroup horizontal className='mt-3'>
                <ListGroup.Item className='border-0'>
                  <Form.Control as='select' value={qtyForCart} onChange={(e) => setQtyForCart(e.target.value)}>
                    {[...Array(qtyInStock).keys()].map(x => (
                      // Limit the user to a max of 10 items added to the cart at once
                      (x + 1 <= 10 &&
                        <option key={x+1} value={x + 1}>
                        {x + 1}
                        </option>
                      )
                    ))}
                  </Form.Control>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                  <Button className='btn-block' type='button' variant="dark" onClick={addToCartHandler}>
                    Add to Cart
                  </Button>
                </ListGroup.Item>
            </ListGroup>
            <hr></hr>
          </Card>
        </Col>{/* End of Product Name / Sizes / Colors */}
      </Row>
      <hr></hr>
    </>
  )
}

export default ProductScreen;
