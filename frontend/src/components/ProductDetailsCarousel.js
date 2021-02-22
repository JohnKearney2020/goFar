import React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductDetailsCarousel = () => {
  return (
    <Carousel interval={null}>
      <Carousel.Item>
        <img src='https://i.imgur.com/T7pSpXB.jpg' alt={`Slide 1`} fluid/>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} fluid/>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} fluid/>
      </Carousel.Item>
      <Carousel.Item>
        <img src='https://i.imgur.com/VQBuiSz.jpg' alt={`Slide 4`} fluid/>
      </Carousel.Item>
    </Carousel>
  )
}

export default ProductDetailsCarousel;
