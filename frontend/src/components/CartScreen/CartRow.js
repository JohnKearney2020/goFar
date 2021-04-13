import React, { useState, useEffect } from 'react';
import { Image, Button, Form, Col, Row, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner as spinner } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';


const CartRow = ({ productID, productName, color, size, sizeCategory, qty, productImage, dateAdded, index, savedForLater }) => {
  // Format the size for the Size column
  let sizeForTable = '';
  sizeCategory !== 'ONE SIZE' ? sizeForTable = `${size} - ${sizeCategory}` : sizeForTable = 'ONE SIZE';

  const [loadingDeleteIcon, setLoadingDeleteIcon] = useState(false);

  const deleteWishListItemHandler = () => {
    console.log('delete from cart clicked')
  }

  return (
    <ListGroup.Item className=''>
    {/* <Row className='align-items-center justify-content-center'> */}
    <Row className='align-items-center'>
      {/* ===================== */}
      {/*     Product Image     */}
      {/* ===================== */}
      <Col md={2}>
        <Link to={`/product/${productID}/${color}`}>
          <Image src={productImage} alt={productName} fluid rounded />
        </Link>
      </Col>
      {/* ===================== */}
      {/*         Name          */}
      {/* ===================== */}
      <Col md={3} className='text-center'>
        <Link to={`/product/${productID}/${color}`}>{productName}</Link>
      </Col>
      {/* ===================== */}
      {/*         Color         */}
      {/* ===================== */}
      <Col md={1} className='text-center'>{color}</Col>
      {/* ===================== */}
      {/*         Size          */}
      {/* ===================== */}
      <Col md={2} className='text-center'>{sizeForTable}</Col>
      {/* ===================== */}
      {/*      Qty Available    */}
      {/* ===================== */}
      <Col md={1} className='text-center'>
        {/* {qtyForTable === 0 ? <span className='text-danger font-weight-bold'>Out of Stock</span> : ( qtyForTable > 10 ? '10+' : (qtyForTable <= 5 ? <span className='text-danger font-weight-bold'>{qtyForTable}</span> : qtyForTable ))} */}
        15
      </Col>
      {/* ===================== */}
      {/*         Price         */}
      {/* ===================== */}
      <Col md={2} className='text-center'>
        {/* ${tablePrice} */}
        $15
      </Col>
      {/* ===================== */}
      {/*    Add to Cart Form   */}
      {/* ===================== */}
      {/* {(qtyForCart === 0 && hasSizes === false) &&
        <Col md={2} className='text-center'>
          <span className='text-danger font-weight-bold'>Out of Stock</span> 
        </Col>
      }  */}
      {/* {(qtyForTable === 0 && hasSizes === true && availableInOtherSizes === true) &&
        <Col md={2} className='text-center'>
          <span className='text-danger font-weight-bold'>Available in Other Sizes</span> 
        </Col>
      } 
      {qtyForTable !== 0 &&
        <>
          <Col md={1}>
            {qtyForTable}
          </Col>
        </>
      } */}
      {/* <Col md={2}>
        {qty}
      </Col> */}
      <Col md={1} className=''>
        <Button size='sm' variant='danger' className='' disabled={loadingDeleteIcon} onClick={deleteWishListItemHandler}>
          <FontAwesomeIcon className='' icon={loadingDeleteIcon ? spinner : faTrashAlt} size="2x" />
        </Button>
        {/* <Button>
          P
        </Button> */}
      </Col>
    </Row> 
  </ListGroup.Item>
  )
}

export default CartRow;
