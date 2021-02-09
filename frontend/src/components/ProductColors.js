import React from 'react';
import { Container, Image, Row } from 'react-bootstrap';

import './ProductColors.css';

const ProductColors = ({ images, colorSelectHandler }) => {
  //this function is defined in the ProductCard component
  const newColorClickedHandler = (e) => {
    colorSelectHandler(e.target.dataset.color); //its expecting a color name as a string, ex: 'seapine'
  }

  return (
    <Container>
      <Row>
        {images.map(eachColorImage => (
          <Image src={eachColorImage.tinyImage} roundedCircle thumbnail className="mr-1 productColorsBorder" 
          key={eachColorImage.tinyImage}
          data-color={eachColorImage.colorName}
          onClick={newColorClickedHandler}
          />
        ))}
      </Row>
    </Container>
  )
}

export default ProductColors;
