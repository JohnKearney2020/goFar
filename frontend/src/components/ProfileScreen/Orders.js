import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Col, Row } from 'react-bootstrap';

import OrderContainer from './OrderContainer';
import OrderPagination from './OrderPagination';
import Message from '../Message';
import Loader from '../Loader';
import { addGoogleMapsScript } from '../../utilityFunctions/googleMapsScript';
import { MAP_LOADED_SCRIPT_TRUE } from '../../constants/mapConstants';
import { listUserOrders } from '../../actions/orderActions';
import './Orders.css';

const Orders = () => {
  const dispatch = useDispatch();
  const mountedGoogleScript = useRef(false);
  const haveFetchedOrders = useRef(false);
  //Pull in the order information from the global state
  const userOrderList = useSelector(state => state.userOrders);
  const { loading, orders, page, pages } = userOrderList;

  const changePageHandler = (e) => {
    // setPage(Number(e.target.dataset.pagenumber));
    dispatch(listUserOrders(e.target.dataset.pagenumber));
  }

  useEffect(() => {
    let unmounted = false;
    if(haveFetchedOrders.current === false){
      dispatch(listUserOrders(page));
      haveFetchedOrders.current = true;
    }
    // If this component is still mounted and we haven't mounted the Google Maps script to the body yet and orders exist
    // The script can also be mounted if the user places an order. We use the geocoding service during the order
    if(!unmounted && !window.google && orders.length > 0 && mountedGoogleScript.current === false){
      mountedGoogleScript.current = true;
      console.log('orders.length: ', orders.length);
      addGoogleMapsScript('calling from Orders.js useEffect', dispatch, {type: MAP_LOADED_SCRIPT_TRUE});
    }
    return () => { unmounted = true };
  }, [orders, page, dispatch])

  return (
    <>
      <Row className={`justify-content-between align-items-center w-100 mx-0 mt-3 ${loading ? 'mb-5' : ''}`}>
        <Col md={4} className='text-center'>
          <h5 className='mb-sm-1 mb-md-0 order-h5-responsive'>Order #</h5>
        </Col>
        <Col md={4} className='text-center'>
          <h5 className='mb-sm-1 mb-md-0 order-h5-responsive'>Total / Items</h5>
        </Col>
        <Col md={4} className='text-center'>
          <h5 className='m-0 order-h5-responsive'>Date</h5>
        </Col>
      </Row>
      {orders.length === 0 && !loading && <Message variant='info' mtop={3}>{`No orders on file. Treat yourself and buy something :)`}</Message>}
      <div id='orderAccordionDiv' className=''>
        {loading ? <Loader id=''/> : orders.length > 0 &&
          <Accordion defaultActiveKey='0' className='mt-2 mb-5' id='orderAccordion'>
            {orders.map((eachOrder,idx) => (
              <OrderContainer key={eachOrder._id} order={eachOrder} idx={idx}/>
            ))}
          </Accordion>          
        }
      </div>
      <OrderPagination pages={pages} page={page} changePageHandler={changePageHandler}/>
    </>
  )
}

export default Orders;
