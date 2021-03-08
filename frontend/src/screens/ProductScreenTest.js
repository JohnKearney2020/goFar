import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';

const useComponentWillMount = async (func) => {
  console.log('in useComponentWillMount');
  const willMount = useRef(true);
  if (willMount.current) func()
  // const productDetails = useSelector(state => state.productDetails);
  // const { loading, error, product, loaded } = productDetails;
  console.log('in useComponentWillMount - completed function');
  // console.log(func);
  willMount.current = false
}



const ProductScreenTest = ({ match }) => {
  const [loadedProduct, setLoadedProduct] = useState(false);
  const [finalLoad, setFinalLoad] = useState(false);
  const dispatch = useDispatch();

  // const getProductById = async (id) => {
  //   console.log('in function passed to useComponentWillMount');
  //   dispatch(listProductDetails(match.params.id));
  // }

  // useComponentWillMount(() => getProductById(match.params.id))
  // console.log('on line 48 outside of useComponentWillMount function call')

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product, loaded } = productDetails;

  let imageObjArray;
  let sizeObjArray;

  if(loaded === true){
    console.log(loaded)
    // console.log(loadedProduct)
    imageObjArray = product.images;
    sizeObjArray = product.sizes;

  }

  // console.log(product)

  // let imageObjArray = product.images;
  // console.log(imageObjArray)
  // let sizeObjArray = product.sizes;
  // console.log(sizeObjArray)

  // let imageObjArray;
  // (imageObjArray !== undefined ? imageObjArray = product.images : imageObjArray = '')
  // console.log(imageObjArray)
  // let sizeObjArray;
  // (sizeObjArray !== undefined ? sizeObjArray = product.sizes : imageObjArray = '')
  // let sizeObjArray = product.sizes;
  // console.log(sizeObjArray)


  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch]);

  return (
    <>
      {loaded &&
        <>
          <h1>{product.name}</h1>
          <h2>in ProductScreenTest</h2>
        </>
      }
    </>
  )
}

export default ProductScreenTest;
