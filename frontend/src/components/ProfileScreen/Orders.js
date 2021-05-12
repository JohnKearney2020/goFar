import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Col, Row } from 'react-bootstrap';

import OrderContainer from './OrderContainer';
import './Orders.css';
const Orders = () => {

  //Pull in the order information from the global state
  const userDetails = useSelector(state => state.userDetails.user);
  const { orders } = userDetails;
  const [ordersToDisplay, setOrdersToDisplay] = useState([]);
  const [page, setPage] = useState(0); //the pagination starts on page one

  useEffect(() => {
    console.log('in Orders.js useEffect()')
    if(orders.length > 0 && orders.length <= 10){ //If there are less than 11 orders we won't show pagination
      setOrdersToDisplay(orders);
    } else if(orders.length > 0){ //if the user has more than 10 orders
      const tempOrders = [];
      const pagInterval = 4; //Show 10 products per page
      let startPoint = 0 + pagInterval*page;
      let stopPoint = orders.length - 1 > pagInterval*page + pagInterval ? pagInterval*page + pagInterval : orders.length;
      console.log('startPoint:', startPoint)
      console.log('stopPoint:', stopPoint)
      for(let i=startPoint; i < stopPoint; i++){
        tempOrders.push(orders[i]);
      }
      console.log('sorted orders: ')
      console.log(tempOrders)
      setOrdersToDisplay(tempOrders);
    }
    return () => {
      
    }
  }, [orders])

  return (
    <>
    {ordersToDisplay &&
      <>
        <Row className='justify-content-between align-items-center w-100 mx-0 mt-3'>
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
        <Accordion defaultActiveKey='0' className='mt-2 mb-5'>
          {ordersToDisplay.map((eachOrder,idx) => (
            <OrderContainer key={eachOrder._id} order={eachOrder} idx={idx}/>
          ))}
        </Accordion>
      </>
    }

    </>
  )
}

export default Orders;
