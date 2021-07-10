import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { CSSTransition } from 'react-transition-group';

import { listProducts, listGenderProducts } from '../actions/productActions';
import ProductCard from '../components/ProductComponents/ProductCard';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

import './HomeScreen.css';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const gender = match.params.gender;
  const pageNumber = match.params.pageNumber || 1;

  // Get products from the global state
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const noResultsMessage = `No results. We couldn't find any products that matched what you were looking for. Try another search and we will do our best to find them. Pinky promise :)`

  useEffect(() => {
    if(keyword === 'all'){
      dispatch(listGenderProducts(gender, pageNumber));
    } else {
      dispatch(listProducts(keyword, gender, pageNumber));
    }
  }, [dispatch, keyword, gender, pageNumber]);

  let productsToDisplay = products.map((product, idx) => {
    return (
      <Col className='d-flex align-items-stretch' key={product._id} sm={12} md={6} lg={4} xl={3}>
        <ProductCard product={product} key={product._id}/>
      </Col>
    )
  })

  return (
      <>
        <Helmet>
          <title>{`Welcome to Go Far`}</title>
        </Helmet>
        {gender && keyword !== 'all' ? <h1>{gender}'s {keyword}</h1> : keyword && keyword !== 'all' ? <h1>Search Results for "{keyword}"...</h1> : keyword === 'all' ? <h1>{gender}'s Clothing</h1> : <h1>Latest Products</h1>}
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message> }
        {products.length === 0 && !loading && <Message variant='info'>{noResultsMessage}</Message> }
          <CSSTransition 
            in={productsToDisplay.length === products.length && productsToDisplay.length > 0} 
            timeout={2000} 
            classNames="product-transition"
          >
            <div>
              <Row>
                {productsToDisplay}
              </Row>
              <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} gender={gender ? gender : ''} />
            </div>
          </CSSTransition>
    </>
  )
}

export default HomeScreen;
