import React from 'react';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';

const FeatureIcons = ({ arrayOfImages }) => {
  return (
    <>
      {arrayOfImages.map((eachImage,idx) => 
      (
        <Col className='text-center' key={idx}>
          <Image src={eachImage.source} alt={eachImage.heading} className='m-4'/>
          <h5 className='font-weight-bold'>{eachImage.heading}</h5>
        </Col>

      ))}
    </>
  )
}

export default FeatureIcons;
