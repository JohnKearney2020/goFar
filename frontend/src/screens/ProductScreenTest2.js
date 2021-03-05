import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants';
import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';

// import ProductDetailsCarousel from '../components/ProductComponents/ProductDetailsCarousel';
import ProductDetailsCarousel from '../components/ProductComponents/ProductDetailsCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductRating from '../components/ProductComponents/ProductRating';
import ProductColors from '../components/ProductComponents/ProductColors';



const ProductScreenTest2 = ({ match }) => {

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product, loaded } = productDetails;
  const colorFromUrl = match.params.color;

  const [selectedColor, setSelectedColor] = useState(colorFromUrl);
  const [colorSalePrice, setColorSalePrice] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedSizeCategory, setSelectedSizeCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [qtyInStock, setQtyInStock] = useState('');
const [productColors, setProductColors] = useState([]);
const [clearanceColors, setClearanceColors] = useState([]);

  //=====================================================================================================
  //                                       Product Color Arrrays
  //=====================================================================================================
  // here we split the product colors into the regular product colors, and the clearance product colors
  // let productColors = [];
  // let clearanceColors = [];

  // ==============================================================
  //               Pull Product data from global state
  //===============================================================
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => {
      console.log('in cleanup function of ProductScreenTest2.js');
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
  }, [dispatch]);

  // =================================================================================================================
  //                                Find default Prices and size category
  //==================================================================================================================
  useEffect(() => {

    if(product.name){ // If we've successfully loaded the product from the global state
      console.log('in 2nd useEffect')
      let initialSizeCategory;
      product.hasSizes ? initialSizeCategory = product.sizes[0].sizeCategoryName : initialSizeCategory = 'ONE SIZE';
      setSelectedSizeCategory(initialSizeCategory);

      // Populate Product Colors
      let tempProductColors = [];
      let tempClearanceColors = [];
      for(let eachColor of product.colors){
        eachColor.clearance === false ? tempProductColors.push(eachColor) : tempClearanceColors.push(eachColor);
      }
      setProductColors(tempProductColors);
      setClearanceColors(tempClearanceColors);

      if(product.hasSizes){ //if the product has sizes
        let sizeObjArray = product.sizes;

        let sizesAndPricesObjArray = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === initialSizeCategory)].sizeCategoryColorsAndSizes;
  
        let initialSalePrice = sizesAndPricesObjArray[sizesAndPricesObjArray.findIndex(index => index.color === colorFromUrl)].colorSalePrice;
        let initialDefaultPrice = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === initialSizeCategory)].sizeCategoryDefaultPrice;
  
        setColorSalePrice(initialSalePrice);
        setProductPrice(initialDefaultPrice);
      } else { //if the product does not have sizes
        setColorSalePrice(product.defaultPrice);
        setProductPrice(product.defaultSalePrice);
      }

    }
  }, [product])

  const sizeCategoryHandler = (e) => {
    //If we are changing size categories we need to clear the selectedSize state entirely to reset it, i.e. from 'Regular' to 'Tall', or vice versa
    //We also want to reset activeKey to clear any size buttons that the user selected
    //We also need to find the price of the product in the same color, but the new size category, both the default and a sale price if it exists.
    let sizeObjArray = product.sizes;
    let sizeCat = e.target.value;
    if(sizeCat !== selectedSizeCategory) { setSelectedSize('') }
    setSelectedSizeCategory(sizeCat);
    setActiveKey('');
    setQtyInStock(''); //since we are clearing out any size selections, we need to clear the qtyInStock local state, too.

    // Find new default price
    let newSizeCatDefaultPrice = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)].sizeCategoryDefaultPrice;
    setProductPrice(newSizeCatDefaultPrice);

    // Find new sale price
    let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)].sizeCategoryColorsAndSizes;
    let newSizeCatSalePrice = levelOne[levelOne.findIndex(index => index.color === selectedColor)].colorSalePrice;
    setColorSalePrice(newSizeCatSalePrice);
  }

  const colorSelectHandler = (colorClicked) => {
    // ==========================================================================================
    //                            Find the price for that color:
    //===========================================================================================
    // if(colorClicked !== selectedColor){ // Only run the function if a new color has been selected
    //   let colorSalePrice = sizesAndPricesObjArray[sizesAndPricesObjArray.findIndex(index => index.color === colorClicked)].colorSalePrice;
    //   setColorSalePrice(colorSalePrice);
      // If we felt adventurous we could string this all into one line like below, but for ease of reading the code I did not;
      // console.log(sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes[sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes.findIndex(index => index.color === colorClicked)].colorSalePrice);
    // }
    // setSelectedColor(colorClicked);
    // const colorSpecificImgObjArray = imageObjArray[imageObjArray.findIndex(index => index.color === colorClicked)].colorImages;
    // setPrimaryImage(colorSpecificImgObjArray.find(image => image.isPrimaryImage === true).source);
    // setColorImagesForCarousel(colorSpecificImgObjArray.map(eachImgObj => eachImgObj.source));
    //Check to see if the current size selected is not available in the new color. If it isn't, reset the local state of selectedSize to ''
    //If it is, find the available qty for the new color in the size selected.
    // let sizeFound = false;
    // if(selectedSize !== ''){
    //   let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
    //   let levelTwo = levelOne[levelOne.findIndex(i => i.color === colorClicked)].sizeCategorySizes;
    //   let levelThree = levelTwo[levelTwo.findIndex(i => i.size === selectedSize)];
    //   if(levelThree.qty !== 0) {
    //     sizeFound = true;
    //     setQtyInStock(levelThree.qty);
    //   }
    // }
    // if(sizeFound === false) { //If the size is not found in the new color, reset the selectedSize and qtyInStock local state
    //   setSelectedSize('');
    //   setQtyInStock('');
    // }
  }

  return (
    <>
      { loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : 
        <>
          <Row>
            <Col md={6}>
              <ProductDetailsCarousel 
                product={product}
                colorFromUrl={colorFromUrl}
              />
            </Col>
            <Col md={6}>
              <Card border='light'> {/* light removes the border */}
                {/* Sub-brand && product Name */}
                <ListGroup variant='flush'>
                  {product.subBrand && 
                    <ListGroup.Item className='border-0 pb-0'>
                      {product.subBrand ?? <h6>{product.subBrand}</h6>}                
                    </ListGroup.Item>
                  }
                {/* <ListGroup.Item className='border-0 pb-0'>
                    {product.subBrand ?? <h6>{product.subBrand}</h6>}                
                </ListGroup.Item> */}
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
                    <ProductColors images={productColors} colorSelectHandler={colorSelectHandler} productColorsArray={product.colors} colorFromUrl={colorFromUrl}/>
                  </ListGroup.Item>
                </ListGroup>
                {/* Clearance Items */}
                {clearanceColors.length > 0 && 
                  <ListGroup>
                    <ListGroup.Item className='border-0 pb-1 text-danger'>Clearance: </ListGroup.Item>
                    {/* Clearance Colors */}
                    <ListGroup.Item className='border-0 pt-1'>
                      <ProductColors images={clearanceColors} colorSelectHandler={colorSelectHandler} productColorsArray={product.colors} colorFromUrl={colorFromUrl}/>
                    </ListGroup.Item>
                  </ListGroup>            
                }
              </Card>
            </Col>
          </Row>
        </>

      }
    </>
  )
}

export default ProductScreenTest2;
