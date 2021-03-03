import React, { useState } from 'react';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import ProductColors from '../components/ProductComponents/ProductColors';
import ProductRating from '../components/ProductComponents/ProductRating';
import SizeSelector from '../components/ProductComponents/SizeSelector';
import products from '../products2';
import QuantityAlert from '../components/ProductComponents/QuantityAlert';
import FeatureIcons from '../components/ProductComponents/FeatureIcons';
import ProductDescription from '../components/ProductComponents/ProductDescription';
import ProductFeatures from '../components/ProductComponents/ProductFeatures';
import ProductMaterials from '../components/ProductComponents/ProductMaterials';
import ProductCare from '../components/ProductComponents/ProductCare';
import ProductDetailsCarousel from '../components/ProductComponents/ProductDetailsCarousel';


const ProductScreen = ({ match }) => { //the match prop is needed to pull the id from the URL
  // console.log(`match.params.id: ${match.params.id}`)
  // console.log(`match.params.id: ${match.params.color}`)
  const product = products.find((p)=> p._id === match.params.id);
  const imageObjArray = product.images;
  const sizeObjArray = product.sizes;
  const colorFromURL = match.params.color;

  const [selectedColor, setSelectedColor] = useState(colorFromURL);
  const [primaryImage, setPrimaryImage] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
  const [colorImagesForCarousel, setColorImagesForCarousel] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.map(eachImgObj => eachImgObj.source));
  // If the product has size categories like 'Tall', default to the first size category. Otherwise, use 'ONE SIZE'
  let initialSizeCategory;
  product.hasSizes ? initialSizeCategory = product.sizes[0].sizeCategoryName : initialSizeCategory = 'ONE SIZE';
  const [selectedSizeCategory, setSelectedSizeCategory] = useState(initialSizeCategory);
  let initialSize;
  product.hasSizes ? initialSize = '' : initialSize = 'ONE SIZE';
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [activeKey, setActiveKey] = useState('');
  let initialQuantity;
  product.defaultQty ? initialQuantity = product.defaultQty : initialQuantity = '';
  const [qtyInStock, setQtyInStock] = useState(initialQuantity);
  const [qtyForCart, setQtyForCart] = useState(1);

  // ================================================================================================================================================
  //                                                                          Prices
  // ================================================================================================================================================
  let sizesAndPricesObjArray= [];
  let initialSalePrice = product.defaultSalePrice;
  let initialDefaultPrice = product.defaultPrice;
  if(product.hasSizes){ // If this product has sizes
    sizesAndPricesObjArray = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
    initialSalePrice = sizesAndPricesObjArray[sizesAndPricesObjArray.findIndex(index => index.color === colorFromURL)].colorSalePrice;
    initialDefaultPrice = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryDefaultPrice;
  }
  const [colorSalePrice, setColorSalePrice] = useState(initialSalePrice);
  const [productPrice, setProductPrice] = useState(initialDefaultPrice);


  // Test for primary image state
  // console.log(imageObjArray[imageObjArray.findIndex(index => index.hasOwnProperty(colorFromURL))][colorFromURL].find(eachImage => eachImage.isPrimaryImage === true).source);
  const colorSelectHandler = (colorClicked) => {
    // ==========================================================================================
    //                            Find the price for that color:
    //===========================================================================================
    if(colorClicked !== selectedColor){ // Only run the function if a new color has been selected
      let colorSalePrice = sizesAndPricesObjArray[sizesAndPricesObjArray.findIndex(index => index.color === colorClicked)].colorSalePrice;
      setColorSalePrice(colorSalePrice);
      // If we felt adventurous we could string this all into one line like below, but for ease of reading the code I did not;
      // console.log(sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes[sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes.findIndex(index => index.color === colorClicked)].colorSalePrice);
    }
    setSelectedColor(colorClicked);
    const colorSpecificImgObjArray = imageObjArray[imageObjArray.findIndex(index => index.color === colorClicked)].colorImages;
    setPrimaryImage(colorSpecificImgObjArray.find(image => image.isPrimaryImage === true).source);
    setColorImagesForCarousel(colorSpecificImgObjArray.map(eachImgObj => eachImgObj.source));
    //Check to see if the current size selected is not available in the new color. If it isn't, reset the local state of selectedSize to ''
    //If it is, find the available qty for the new color in the size selected.
    let sizeFound = false;
    if(selectedSize !== ''){
      let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
      let levelTwo = levelOne[levelOne.findIndex(i => i.color === colorClicked)].sizeCategorySizes;
      let levelThree = levelTwo[levelTwo.findIndex(i => i.size === selectedSize)];
      if(levelThree.qty !== 0) {
        sizeFound = true;
        setQtyInStock(levelThree.qty);
      }
    }
    if(sizeFound === false) { //If the size is not found in the new color, reset the selectedSize and qtyInStock local state
      setSelectedSize('');
      setQtyInStock('');
    }
  }

  const sizeCategoryHandler = (e) => {
    //If we are changing size categories we need to clear the selectedSize state entirely to reset it, i.e. from 'Regular' to 'Tall', or vice versa
    //We also want to reset activeKey to clear any size buttons that the user selected
    //We also need to find the price of the product in the same color, but the new size category, both the default and a sale price if it exists.
    let sizeCat = e.target.value;
    if(sizeCat !== selectedSizeCategory) { setSelectedSize('') }
    setSelectedSizeCategory(sizeCat);
    setActiveKey('');
    setQtyInStock(''); //since we are clearing out any size selections, we need to clear the qtyInStock local state, too.

    // Find new default price
    // console.log(sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)]);
    let newSizeCatDefaultPrice = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)].sizeCategoryDefaultPrice;
    setProductPrice(newSizeCatDefaultPrice);

    // Find new sale price
    let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)].sizeCategoryColorsAndSizes;
    let newSizeCatSalePrice = levelOne[levelOne.findIndex(index => index.color === selectedColor)].colorSalePrice;
    setColorSalePrice(newSizeCatSalePrice);
  }

  const sizeSelectHandler = (e) => {
    let userSelectedSize = e.target.value;
    setSelectedSize(userSelectedSize); //Change the local state for selectedSize to reflect the size the user chose
    setActiveKey(e.target.dataset.keyforactivekey); //Make the corresponding size button the user clicked active
    //Find the quantity available in the new size
    let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
    let levelTwo = levelOne[levelOne.findIndex(i => i.color === selectedColor)].sizeCategorySizes;
    let levelThree = levelTwo[levelTwo.findIndex(i => i.size === userSelectedSize)];
    if(levelThree.qty !== 0) {
      setQtyInStock(levelThree.qty);
    }
  }

  const addToCartHandler = () => {
    console.log(`Clicked add to cart!`)
    console.log(`qyt for cart = ${qtyForCart}`)
  }

  const carouselClickHandler = (e) => {
    // Change the main image to the one that was clicked
    setPrimaryImage(e.target.src)
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
                {/* <PriceRanges product={product}/> */}
                {colorSalePrice ?
                  <span className='productCardSalePrices'><del>${productPrice}</del> <span className='text-danger productCardSalePrices'>${colorSalePrice}</span></span> :
                  <span className='productCardSalePrices'>${productPrice}</span>
                }
              </ListGroup.Item>
              <ListGroup.Item className='border-0'>
                <ProductRating value={product.rating} text={`${product.numReviews} ${product.numReviews === 1 ? `review` : `reviews`}`}/>
              </ListGroup.Item>
            </ListGroup>
            {/* Size Categories */}
            <ListGroup horizontal defaultActiveKey='0' className='px-2'>
              {selectedSizeCategory === 'ONE SIZE' ?
                <ListGroup.Item className='border-0'>
                  <Button disabled>Regular</Button>
                </ListGroup.Item> :
                product.sizes.map((eachSize,idx) =>
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
                )
              }
            </ListGroup>
            {/* Selected Color & Product Colors */}
            <ListGroup>
              <ListGroup.Item className='border-0 pb-1'>Color: {<span className='font-weight-bold'>{selectedColor}</span>}</ListGroup.Item>
              {/* Product Colors */}
              <ListGroup.Item className='border-0 pt-1'>
                <ProductColors images={productColors} colorSelectHandler={colorSelectHandler} productColorsArray={product.colors} colorFromUrl={colorFromURL}/>
              </ListGroup.Item>
            </ListGroup>
            {/* Clearance Items */}
            {clearanceColors.length > 0 && 
              <ListGroup>
                <ListGroup.Item className='border-0 pb-1 text-danger'>Clearance: </ListGroup.Item>
                {/* Clearance Colors */}
                <ListGroup.Item className='border-0 pt-1'>
                  <ProductColors images={clearanceColors} colorSelectHandler={colorSelectHandler} productColorsArray={product.colors} colorFromUrl={colorFromURL}/>
                </ListGroup.Item>
              </ListGroup>            
            }
            {/* Size Selected & Sizes */}
            <ListGroup>
            { selectedSizeCategory === 'ONE SIZE' ?
              <ListGroup.Item className='border-0 pb-1'>
                <span>Size: </span><span className='font-weight-bold'>ONE SIZE</span>
              </ListGroup.Item> :
              <ListGroup.Item className='border-0 pb-1'>
                  <span>Size: </span><span className='font-weight-bold'>{selectedSize}</span>
              </ListGroup.Item>  
            }
            </ListGroup>
            {/* Size Selector */}
            {selectedSizeCategory === 'ONE SIZE' ?
              // <ListGroup className='px-2 py-3'>
              <ListGroup className='px-2'>
                <ListGroup.Item className='border-0'>
                  <Button disabled>ONE SIZE</Button>
                </ListGroup.Item>
              </ListGroup> :
              <SizeSelector 
                product={product} 
                selectedSizeCategory={selectedSizeCategory} 
                selectedColor={selectedColor} 
                sizeSelectHandler={sizeSelectHandler}
                activeKey={activeKey}
              />
            }

            {/* Quantity Alert */}
            {qtyInStock <= 5 && qtyInStock &&
              <QuantityAlert qtyInStock={qtyInStock}/>
            }
            <hr />
            {/* Qty Select and Add to Cart Button */}
            <ListGroup horizontal>
                <ListGroup.Item className='border-0'>
                  <Form.Control as='select' value={qtyForCart} onChange={(e) => setQtyForCart(e.target.value)} disabled={!(selectedSize !== '' && qtyInStock > 0)}>
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
