import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';

const ProductColors = ({ images }) => {
  return (
    <Container>
      <Row>
        {images.map(eachColorImage => (
          <Image src={eachColorImage.tinyImage} roundedCircle thumbnail className="mr-1" />
        ))}
      </Row>
    </Container>
  )
}

export default ProductColors;
