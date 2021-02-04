import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';

import './ProductColors.css';

const ProductColors = ({ images }) => {
  return (
    <Container>
      <Row>
        {images.map(eachColorImage => (
          <Image src={eachColorImage.tinyImage} roundedCircle thumbnail className="mr-1 productColorsBorder" key={eachColorImage.tinyImage}/>
        ))}
      </Row>
    </Container>
  )
}

export default ProductColors;
