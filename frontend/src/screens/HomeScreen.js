import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import { listProducts } from '../actions/productActions';
import ProductCard from '../components/ProductComponents/ProductCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import './HomeScreen.css';

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
    <h1>Latest Products</h1>
      {loading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) :
        (<Row>
          {products.map(product => (
            <Col className='d-flex align-items-stretch' key={product._id} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} key={product._id}/>
            </Col>
          ))}
        </Row>)
      }
    </>
  )
}

export default HomeScreen;
