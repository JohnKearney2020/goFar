import React from 'react';
import { Card } from 'react-bootstrap';

const FeatureIcons = ({ arrayOfImages }) => {
  return (
    <>
      {arrayOfImages.map((eachImage,idx) => 
      (
        <Card key={idx} border='light' className='text-center' style={{ width: '10rem' }}>
          <Card.Img variant='top' src={eachImage.source} />
          <Card.Title className='mt-2 font-weight-bold'>{eachImage.heading}</Card.Title>
        </Card>
      ))}
    </>
  )
}

export default FeatureIcons;
