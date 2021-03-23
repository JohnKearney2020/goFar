import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './OffsetPageHeader.css';

const OffsetPageHeader = ({ leftHeaderText, rightHeaderText }) => {
  return (
    <>
      <Row className='w-100 my-2' >
        <Col className='d-inline-flex justify-content-center' id='userProfileScreenHeading' md={12}>
          <h1 className='display-5'>{leftHeaderText}</h1><div className="vl mx-4"></div><h5 className=''>{rightHeaderText}</h5>
        </Col>
      </Row>
      <hr />
    </>
  )
}

export default OffsetPageHeader;
