import React from 'react';
// import { Container, Image, Row } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import './ProductColors.css';

const ProductColors = ({ images, colorSelectHandler }) => {
  //this function is defined in the ProductCard component
  const newColorClickedHandler = (e) => {
    colorSelectHandler(e.target.dataset.color); //its expecting a color name as a string, ex: 'seapine'
    const colorsButtons = document.getElementsByClassName('colorButton');
    // colorsButtons.forEach(eachImage => eachImage.classList.remove('colorActiveBorder')); 
    //remove any existing active borders
    for(let eachColor of colorsButtons) {
      eachColor.classList.remove('colorButtonActiveBorder');
    }
    const activeColor = document.getElementById(e.target.id);
    activeColor.classList.add('colorButtonActiveBorder')

    // remove existing borders
    // const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
    // for(let eachImage of imagesWithBorders){
    //   eachImage.classList.remove('selectedBorderCarousel');
    // }
    // Add the border to the clicked image
    // const imageForBorder = document.getElementById(e.target.id);
    // imageForBorder.classList.add('selectedBorderCarousel');

  }

  return (
    // <Container>
      // <Row>
      <>
        {images.map((eachColorImage,idx) => (
          <Image src={eachColorImage.tinyImage} roundedCircle thumbnail className="mr-1 colorButton" 
          key={eachColorImage.tinyImage}
          data-color={eachColorImage.colorName}
          onClick={newColorClickedHandler}
          id={uuidv4()}
          />
        ))}
      </>

      // </Row>
    // </Container>
  )
}

export default ProductColors;
