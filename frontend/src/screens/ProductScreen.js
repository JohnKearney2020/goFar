import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, ListGroup, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ProductDetailsCarousel from '../components/ProductComponents/ProductDetailsCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductRating from '../components/ProductComponents/ProductRating';
import ProductColors from '../components/ProductComponents/ProductColors';
import SizeSelector from '../components/ProductComponents/SizeSelector';
import QuantityAlert from '../components/ProductComponents/QuantityAlert';
import FeatureIcons from '../components/ProductComponents/FeatureIcons';
import ProductDescription from '../components/ProductComponents/ProductDescription';
import ProductFeatures from '../components/ProductComponents/ProductFeatures';
import ProductCare from '../components/ProductComponents/ProductCare';
import ProductMaterials from '../components/ProductComponents/ProductMaterials';
import ProductReviews from '../components/ProductComponents/ProductReviews/ProductReviews';
import { listProductDetails } from '../actions/productActions';
import { PRODUCT_DETAILS_RESET } from '../constants/productConstants';
import { ADD_REVIEW_RESET } from '../constants/reviewConstants';
import WishListButton from '../components/ProductComponents/WishListButton';
import AddToCartButton from '../components/ProductComponents/AddToCartButton';
import { addDecimals } from '../utilityFunctions/addDecimals';
import AddReviewRow from '../components/ProductComponents/ProductReviews/AddReviewRow';
import './ProductScreen.css';

const ProductScreen = ({ match }) => {

  const colorFromUrl = match.params.color;
  const dispatch = useDispatch();
  //Global State
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product, loaded } = productDetails;

  const addReview = useSelector(state => state.addReview);
  const { error:reviewError } = addReview;
  
  //Local State
  const [selectedColor, setSelectedColor] = useState(colorFromUrl);
  const [colorSalePrice, setColorSalePrice] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedSizeCategory, setSelectedSizeCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeKey, setActiveKey] = useState('');
  const [qtyInStock, setQtyInStock] = useState(0);
  const [productColors, setProductColors] = useState([]);
  const [clearanceColors, setClearanceColors] = useState([]);
  const [qtyForCart, setQtyForCart] = useState(1);
  const [addToCartSizeMessage, setAddToCartSizeMessage] = useState(false);
  const [primaryImageForColor, setPrimaryImageForColor] = useState('');
  const [outOfStock, setOutOfStock] = useState(true);
  // let outOfStock = true;

  // ==============================================================
  //               Pull Product data from global state
  //===============================================================
  useEffect(() => {
    // console.log('in productScreenTest2 1st useEffect()')
    dispatch(listProductDetails(match.params.id));
    return () => {
      // console.log('in cleanup function of ProductScreenTest2.js');
      dispatch({ type: PRODUCT_DETAILS_RESET });
      dispatch({ type: ADD_REVIEW_RESET });
    }
  }, [dispatch, match.params.id]);

  // =================================================================================================================
  //                                Find default Prices and size category
  //==================================================================================================================
  useEffect(() => {
    if(loaded){ // If we've successfully loaded the product from the global state
      //Find the initialSizeCategory, ex: 'Regular', 'Tall', etc.
      let initialSizeCategory = product.sizes[0].sizeCategoryName;
      setSelectedSizeCategory(initialSizeCategory);
      // Populate Product Colors
      let tempProductColors = [];
      let tempClearanceColors = [];
      for(let eachColor of product.colors){
        eachColor.clearance === false ? tempProductColors.push(eachColor) : tempClearanceColors.push(eachColor);
      }
      setProductColors(tempProductColors);
      setClearanceColors(tempClearanceColors);

      // Prices
      let sizeObjArray = [...product.sizes];
      let sizesAndPricesObjArray = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === initialSizeCategory)].sizeCategoryColorsAndSizes;
      let initialSalePrice = sizesAndPricesObjArray[sizesAndPricesObjArray.findIndex(index => index.color === colorFromUrl)].colorSalePrice;
      let initialDefaultPrice = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === initialSizeCategory)].sizeCategoryDefaultPrice;
      setColorSalePrice(addDecimals(initialSalePrice));
      setProductPrice(addDecimals(initialDefaultPrice));
      //==========================================
      // Check to see if the product is sold out
      //==========================================
      for(let sizeCategory of sizeObjArray){ //Loop through all the size categories, i.e. 'Regular', 'Petite', etc.
        for(let eachColor of sizeCategory.sizeCategoryColorsAndSizes){ //Loop through each color in that size category, i.e. 'Black', 'Ascent Blue', etc.
          for(let eachSize of eachColor.sizeCategorySizes){ //Loop through each size of that color, ie. 'XS', 'S', 'M', etc.
            if(eachSize.qty !== 0){
              setOutOfStock(false); //We have some in stock
              break; //exit out of all these for of loops
            }
          }
        }
      }
    }
  }, [product, colorFromUrl, loaded ]);


  const sizeCategoryHandler = (e) => {
    //If we are changing size categories we need to clear the selectedSize state entirely to reset it, i.e. from 'Regular' to 'Tall', or vice versa
    //We also want to reset activeKey to clear any size buttons that the user selected
    //We also need to find the price of the product in the same color, but the new size category, both the default and a sale price if it exists.
    let sizeCat = e.target.value;
    if(sizeCat !== selectedSizeCategory) { //only run if the user has selected a new size category
      let sizeObjArray = [...product.sizes];
      //if we've chosen a new size category, clear any previously selected sizes
      setSelectedSize('');
      setSelectedSizeCategory(sizeCat);
      setActiveKey('');
      setQtyInStock(''); //since we are clearing out any size selections, we need to clear the qtyInStock local state, too.
      setQtyForCart(1);
  
      // Find new default price
      let newSizeCatDefaultPrice = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)].sizeCategoryDefaultPrice;
      setProductPrice(addDecimals(newSizeCatDefaultPrice));
  
      // Find new sale price
      let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === sizeCat)].sizeCategoryColorsAndSizes;
      let newSizeCatSalePrice = levelOne[levelOne.findIndex(index => index.color === selectedColor)].colorSalePrice;
      setColorSalePrice(addDecimals(newSizeCatSalePrice));
    }
  }

  const colorSelectHandler = (colorClicked) => {
    // ==========================================================================================
    //                            Find the price for that color:
    //===========================================================================================
    if(colorClicked !== selectedColor){ // Only run the function if a new color has been selected
      setSelectedColor(colorClicked);
      const sizeObjArray = [...product.sizes];
      // const imageObjArray = [...product.images];
      let sizesAndPricesObjArray = sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
      // console.log(sizesAndPricesObjArray);
      let colorSalePrice = sizesAndPricesObjArray[sizesAndPricesObjArray.findIndex(index => index.color === colorClicked)].colorSalePrice;
      // console.log(colorSalePrice)
      setColorSalePrice(addDecimals(colorSalePrice));
      // If we felt adventurous we could string this all into one line like below, but for ease of reading the code I did not;
      // console.log(sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes[sizeObjArray[sizeObjArray.findIndex(index => index.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes.findIndex(index => index.color === colorClicked)].colorSalePrice);
      // const colorSpecificImgObjArray = imageObjArray[imageObjArray.findIndex(index => index.color === colorClicked)].colorImages;
      // setPrimaryImageForCarousel(colorSpecificImgObjArray.find(image => image.isPrimaryImage === true).source);
      // setColorImagesForCarousel(colorSpecificImgObjArray.map(eachImgObj => eachImgObj.source));

      // Check to see if the current size selected is not available in the new color. If it isn't, reset the local state of selectedSize to ''
      // If it is, find the available qty for the new color in the size selected.
      let sizeFound = false;
      if(selectedSize !== ''){
        let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
        let levelTwo = levelOne[levelOne.findIndex(i => i.color === colorClicked)].sizeCategorySizes;
        let levelThree = levelTwo[levelTwo.findIndex(i => i.size === selectedSize)];
        levelThree.qty > 0 ? setQtyInStock(levelThree.qty) : setQtyInStock(0);
        if(levelThree.qty > 0) {
          setQtyInStock(levelThree.qty);
          sizeFound = true;
        } else { setQtyInStock(0) };
      }
      if(sizeFound === false) { //If the size is not found in the new color, reset the selectedSize and qtyInStock local state
        setSelectedSize('');
        setQtyInStock('');
        setActiveKey('');
      }
    }
  }

  const sizeSelectHandler = (e) => {
    let userSelectedSize = e.target.value;
    if(userSelectedSize !== selectedSize) { //only run if the user has selected a new size
      if(addToCartSizeMessage) {
        setAddToCartSizeMessage(false);
      }
      let userSelectedSize = e.target.value;
      setSelectedSize(userSelectedSize); //Change the local state for selectedSize to reflect the size the user chose
      setActiveKey(e.target.dataset.keyforactivekey); //Make the corresponding size button the user clicked active
      //Find the quantity available in the new size
      const sizeObjArray = [...product.sizes];
      let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
      let levelTwo = levelOne[levelOne.findIndex(i => i.color === selectedColor)].sizeCategorySizes;
      let levelThree = levelTwo[levelTwo.findIndex(i => i.size === userSelectedSize)];
      levelThree.qty > 0 ? setQtyInStock(levelThree.qty) : setQtyInStock(0);
      // if(levelThree.qty !== 0) {
      //   setQtyInStock(levelThree.qty);
      // }
    }
  }
  


  return (
    <>
      <Helmet>
        <title>{`Go Far | ${product.name ? product.name : ''}`}</title>
      </Helmet>
      { loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : 
        <>
          <Row>
            <Col md={6}>
              <ProductDetailsCarousel 
                product={product}
                colorFromUrl={colorFromUrl}
                loaded={loaded}
                // primaryImageFromProductScreen={primaryImageForCarousel}
                selectedColor={selectedColor}
                setPrimaryImageForColor={setPrimaryImageForColor}
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
                    {/* For some reason, I can't compare to 0 or 0.00 to see if colorSalePrice === 0.00 */}
                    {colorSalePrice !== addDecimals(0) ?
                      <span className='productCardSalePrices'><del>${productPrice}</del> <span className='text-danger productCardSalePrices'>${colorSalePrice}</span></span> :
                      <span className='productCardSalePrices'>${productPrice}</span>
                    }
                  </ListGroup.Item>
                  <ListGroup.Item className='border-0'>
                    <ProductRating useTotalRating={true}/>
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
                {/* Size Selected & Sizes Text */}
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
                <SizeSelector 
                  product={product} 
                  selectedSizeCategory={selectedSizeCategory} 
                  selectedColor={selectedColor} 
                  sizeSelectHandler={sizeSelectHandler}
                  activeKey={activeKey}
                  loaded={loaded}
                />
                {/* Quantity Alert */}
                {qtyInStock <= 5 && qtyInStock !== 0 &&
                  <QuantityAlert qtyInStock={qtyInStock}/>
                }
                <hr />
                {/* Qty Select and Add to Cart Button */}
                {addToCartSizeMessage &&
                  <Message variant='danger'>Please choose a size</Message>
                }
                <ListGroup horizontal className='align-items-center'>
                    <ListGroup.Item className='border-0'>
                      <Form.Control 
                        as='select' 
                        value={qtyForCart} 
                        onChange={(e) => setQtyForCart(Number(e.target.value))} 
                        disabled={!(selectedSize !== '' && qtyInStock > 0)}
                        className='py-0 px-3 qtyDropDown'
                      >
                        {[...Array(qtyInStock).keys()].map(x => (
                          // Limit the user to a max of 10 items added to the cart at once
                          (x + 1 <= 10 &&
                            <option key={x+1} value={x + 1} className=''>
                            {x + 1}
                            </option>
                          )
                        ))}
                      </Form.Control>
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0 px-1'>
                      <WishListButton 
                        productID={product._id} 
                        productName={product.name} 
                        color={selectedColor}
                        size={selectedSize}
                        sizeCategory={selectedSizeCategory}
                        primaryImageForColor={primaryImageForColor}
                        outOfStock={outOfStock}
                      />
                    </ListGroup.Item>
                    <ListGroup.Item className='border-0'>
                      <AddToCartButton 
                        productID={product._id} 
                        productName={product.name} 
                        quantity={qtyForCart}
                        color={selectedColor}
                        qtyInStock={qtyInStock}
                        outOfStock={outOfStock}
                        size={selectedSize}
                        sizeCategory={selectedSizeCategory}
                        primaryImageForColor={primaryImageForColor}                       
                      />
                    </ListGroup.Item>
                </ListGroup>
                {/* This is a React Portal defined in the WishListButton component */}
                <div id="wishListErrorMessage"></div>
                {/* This is a React Portal defined in the AddToCartButton component */}
                <div id="cartErrorMessage"></div>
                {/* This is a React Portal defined in the AddToCartButton component */}
                <div id="cartWarningMessage"></div>
                {/* This is a React Portal defined in the AddToCartButton component */}
                <div id="cartLoginMessage"></div>
              </Card>
            </Col> {/* End of Product Name / Sizes / Colors */}
          </Row> {/* End of Top Row */}
          {/* ============================================================================================================ */}
          {/*                                         Bottom Part of Screen                                                */}
          {/* ============================================================================================================ */}
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
          <hr/>
          {/* Reviews */}
          <Row className='justify-content-center my-5'>
            <h1 className='display-4'>Reviews</h1>
          </Row>
          <AddReviewRow productID={match.params.id}/>
          { reviewError && <Message variant='danger'>{`Add review failed - You already created a review for this product on ${reviewError}`}</Message> }
          { loaded && <ProductReviews productID={match.params.id}/> }
        </>
      }
    </>
  )
}

export default ProductScreen;
