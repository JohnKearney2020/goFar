import React, { useState } from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import ProductColors from '../components/ProductColors';
import ProductRating from '../components/ProductRating';
import PriceRanges from '../components/PriceRanges';
import SizeSelector from '../components/SizeSelector';
import products from '../products2';
import QuantityAlert from '../components/QuantityAlert';
import FeatureIcons from '../components/FeatureIcons';
import ProductDescription from '../components/ProductDescription';
import ProductFeatures from '../components/ProductFeatures';
import ProductMaterials from '../components/ProductMaterials';
import ProductCare from '../components/ProductCare';
import ProductDetailsCarousel from '../components/ProductDetailsCarousel';


const ProductScreen = ({ match }) => { //the match prop is needed to pull the id from the URL

  // const arrayOfImages = [
  //   {
  //     source: '/images/firstAscentLogo.svg',
  //     heading: 'First Ascent'
  //   }, {
  //     source: '/images/warmthMinus10.svg',
  //     heading: 'Temp Rating (Moderate Activity)'
  //   }
  //   // }, {
  //   //   source: '/images/fillPower800.svg',
  //   //   heading: 'Fill Power'
  //   // }, {
  //   //   source: '/images/stormRepelDWR.svg',
  //   //   heading: 'StormRepel Super DWR'
  //   // }, {
  //   //   source: '/images/windProof.svg',
  //   //   heading: 'Windproof'
  //   // }, {
  //   //   source: '/images/recycledMaterials.svg',
  //   //   heading: 'Recycled Materials'
  //   // }
  // ]
  
  const product = products.find((p)=> p._id === match.params.id);

  //=========================================================================================
  //          Finding the primary image based on which color the user has selected
  //=========================================================================================
  // Here we simply put our array of images into a variable for easier code reading later
  //      const imagesArray = product.images;
  // Here we use .findIndex() to find the index of the array which contains the key 'Seapine'. Note the use of .hasOwnProperty() to find the index
  // that has a property/key called 'Seapine'
  //      imagesArray[imagesArray.findIndex(index => index.hasOwnProperty('Seapine'))]
  // That will return the 'Seapine' object and its array of images. We need to get the array of images from the object, so we use bracket notation:
  //      imagesArray[imagesArray.findIndex(index => index.hasOwnProperty('Seapine'))]['Seapine']
  // Now that we have the correct array of images, we need to find the 'source' value of the primary image. We use the .find() method b/c it will
  // return a value. Other array methods like .filter() would return an array of length 1
  //      .find(image => image.isPrimaryImage === true).source;

  // const imagesArray = product.images;
  // const placeHolder = imagesArray[imagesArray.findIndex(index => index.hasOwnProperty('Seapine'))]['Seapine'].find(image => image.isPrimaryImage === true).source;

  const imageObjArray = product.images;

  // const colorTest = 'Seapine';
  const colorTest = 'Med Indigo';
  const [selectedColor, setSelectedColor] = useState(colorTest);
  const [primaryImage, setPrimaryImage] = useState(imageObjArray[imageObjArray.findIndex(index => index.hasOwnProperty(colorTest))][colorTest].find(eachImage => eachImage.isPrimaryImage === true).source);
  const [colorImagesForCarousel, setColorImagesForCarousel] = useState(imageObjArray[imageObjArray.findIndex(index => index.hasOwnProperty(selectedColor))][selectedColor].map(eachImgObj => eachImgObj.source));
  const [selectedSizeCategory, setSelectedSizeCategory] = useState(product.sizes[0].sizeCategoryName || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [qtyInStock, setQtyInStock] = useState('');
  const [qtyForCart, setQtyForCart] = useState(0);

// Test for primary image state
// console.log(imageObjArray[imageObjArray.findIndex(index => index.hasOwnProperty(colorTest))][colorTest].find(eachImage => eachImage.isPrimaryImage === true).source);
  
  const colorSelectHandler = (colorClicked) => {
    setSelectedColor(colorClicked);
  //=========================================================================================
  //          Finding the primary image based on which color the user has selected
  //=========================================================================================
  // Here we simply put our array of images into a variable for easier code reading later
  //      const imageObjArray = product.images;
  // Here we use .findIndex() to find the index of the array which contains the key 'Seapine'. Note the use of .hasOwnProperty() to find the index
  // that has a property/key called 'Seapine'
  //      imagesArray[imagesArray.findIndex(index => index.hasOwnProperty('Seapine'))]
  // That will return the 'Seapine' object and its array of images. We need to get the array of images from the object, so we use bracket notation:
  //      imagesArray[imagesArray.findIndex(index => index.hasOwnProperty('Seapine'))]['Seapine']
  // Now that we have the correct array of images, we need to find the 'source' value of the primary image. We use the .find() method b/c it will
  // return a value. Other array methods like .filter() would return an array of length 1
  //      .find(image => image.isPrimaryImage === true).source;
  const colorSpecificImgObjArray = imageObjArray[imageObjArray.findIndex(index => index.hasOwnProperty(colorClicked))][colorClicked];
    // const placeHolder = imagesArray[imagesArray.findIndex(index => index.hasOwnProperty(colorClicked))][colorClicked].find(image => image.isPrimaryImage === true).source;
    // setPrimaryImage(imagesArray[imagesArray.findIndex(index => index.hasOwnProperty(colorClicked))][colorClicked].find(image => image.isPrimaryImage === true).source);
    setPrimaryImage(colorSpecificImgObjArray.find(image => image.isPrimaryImage === true).source);
    setColorImagesForCarousel(colorSpecificImgObjArray.map(eachImgObj => eachImgObj.source));

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

  const carouselClickHandler = (e) => {
    // Change the main image to the one that was clicked
    // setSelectedImage(e.target.src);
    // setSelectedImage(e.target.src);
    setPrimaryImage(e.target.src)

    //remove existing borders
    // const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
    // for(let eachImage of imagesWithBorders){
    //   eachImage.classList.remove('selectedBorderCarousel');
    // }
    //Add the border to the clicked image
    // const imageForBorder = document.getElementById(e.target.id);
    // imageForBorder.classList.add('selectedBorderCarousel');
  }

  //=====================================================================================================
  //                                       Product Color Arrrays
  //=====================================================================================================
  // here we split the product colors into the regular product colors, and the clearance product colors
  let productColors = [];
  let clearanceColors = [];
  for(let eachColor of product.colors){
    eachColor.clearance === false ? productColors.push(eachColor) : clearanceColors.push(eachColor);
  }

  return (
    <>
      <Row>
        {/* Primary Product Image - Left side of page */}
        <Col md={6}>
            <ProductDetailsCarousel 
            primaryImage={primaryImage} 
            productName={product.name}
            // defaultImages={product.defaultPictures}
            // defaultVideo={product.defaultVideo}
            carouselClickHandler={carouselClickHandler}
            colorImagesForCarousel={colorImagesForCarousel}
            productDefaultImages={product.defaultImages}
            productDefaultVideo={product.defaultVideo}
            />

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
                <ProductRating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? `review` : `reviews`}`}/>
              </ListGroup.Item>
            </ListGroup>
            {/* Size Categories */}
            <ListGroup horizontal defaultActiveKey='0' className='px-2 py-3'>
              {product.sizes.map((eachSize,idx) =>
                <ListGroup.Item
                action 
                eventKey={idx} 
                key={idx} 
                className='text-center' 
                onClick={sizeCategoryHandler} 
                value={eachSize.sizeCategoryName}
                >
                  {eachSize.sizeCategoryName}
                </ListGroup.Item>
              )}
            </ListGroup>
            {/* Selected Color & Product Colors */}
            <ListGroup>
              <ListGroup.Item className='border-0 pb-1'>Color: {<span className='font-weight-bold'>{selectedColor}</span>}</ListGroup.Item>
              {/* Product Colors */}
              <ListGroup.Item className='border-0 pt-1'>
                <ProductColors images={productColors} colorSelectHandler={colorSelectHandler} />
              </ListGroup.Item>
            </ListGroup>
            {/* Clearance Items */}
            {clearanceColors.length > 0 && 
              <ListGroup>
                <ListGroup.Item className='border-0 pb-1 text-danger'>Clearance: </ListGroup.Item>
                {/* Product Colors */}
                <ListGroup.Item className='border-0 pt-1'>
                  <ProductColors images={clearanceColors} colorSelectHandler={colorSelectHandler} />
                </ListGroup.Item>
              </ListGroup>            
            }
            {/* Size Selected & Sizes */}
            <ListGroup>
              <ListGroup.Item className='border-0 pb-1'>
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
            {/* Quantity Alert */}
            {qtyInStock <= 5 && qtyInStock &&
              <QuantityAlert qtyInStock={qtyInStock}/>
            }
            <hr />
            {/* Qty Select and Add to Cart Button */}
            <ListGroup horizontal className=''>
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
          </Card>
        </Col>{/* End of Product Name / Sizes / Colors */}
      </Row> {/* End of Top Row */}
      {/* Features Icons */}
      <Row className='my-5 justify-content-around'>
        <FeatureIcons arrayOfImages={product.featureIcons}/>
      </Row>
      <hr />
      {/* Product Description & Features */}
      <Row>
        <Col md={6}>
          <ProductDescription descriptionsArray={product.descriptions}/>
        </Col>
        <Col md={6}>
          <ProductFeatures featuresArray={product.features}/>
        </Col>
      </Row>
      <hr/>
      {/* Care and Materials */}
      <Row>
        <Col md={6}>
            <ProductCare careArray={product.care}/>
          </Col>
          <Col md={6}>
            <ProductMaterials materialsArray={product.materials}/>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen;
