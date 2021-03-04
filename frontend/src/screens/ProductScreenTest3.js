import React, { useState, useEffect, useRef } from 'react';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';


const ProductScreenTest3 = ({ match }) => {

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product, loaded } = productDetails;

  const [imageObjArray, setImageObjArray] = useState([]);
  const [primaryImage, setPrimaryImage] = useState('');

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    setImageObjArray(product.images)
  }, [dispatch, match.params.id]);

  // useEffect(() => {
  //   setImageObjArray(product.images)
  // }, [product.images])

  // setPrimaryImage(imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);

  return (
    <>
      { loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) :
        <>
          <h3>In productScreenTest2</h3>
          <h1>{product.name}</h1>
          <h1>{
          {primaryImage}
          }</h1>
        </>

      }
    </>
  )
}

export default ProductScreenTest3;
