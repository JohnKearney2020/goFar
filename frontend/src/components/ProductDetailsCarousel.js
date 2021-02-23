import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot, DotGroup, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import { Carousel } from 'react-bootstrap';


import './ProductDetailsCarousel.css';

const ProductDetailsCarousel = ({ primaryImage }) => {

  const[selectedImage, setSelectedImage] = useState(primaryImage);

  const carouselClickHandler = (e) => {
    // Change the main image to the one that was clicked
    setSelectedImage(e.target.src);
    //remove existing borders
    const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
    for(let eachImage of imagesWithBorders){
      eachImage.classList.remove('selectedBorderCarousel');
    }
    //Add the border to the clicked image
    const imageForBorder = document.getElementById(e.target.id);
    imageForBorder.classList.add('selectedBorderCarousel');
  }

  return (
    <>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={1}
        visibleSlides={1}
      >
        <Slider>
          <Slide>
            <ImageWithZoom src={selectedImage} alt={`Slide 1`}/>
          </Slide>
        </Slider>
      </CarouselProvider>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={4}
        visibleSlides={3}
        className='mt-3'
      >
        <Slider>
          <Slide index={0}>
            <Dot slide={0} className='productDetailsCarouselDot'>
              <img src='https://i.imgur.com/T7pSpXB.jpg' alt={`Slide 1`} style={{width: '100%', height: 'auto'}} 
              className='productDetailsCarouselImage'
              id={`idForBorder${'0'}`}
              onClick={carouselClickHandler}
              />
            </Dot>
          </Slide>
          <Slide index={1}>
            <Dot slide={1} className='productDetailsCarouselDot'>
              <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} style={{width: '100%', height: 'auto'}} 
                onClick={carouselClickHandler} 
                className='productDetailsCarouselImage'
                id={`idForBorder${'1'}`} 
                onClick={carouselClickHandler}
              />
            </Dot>
          </Slide>
          <Slide index={2}>
            <Dot slide={2} className='productDetailsCarouselDot'>
              <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} style={{width: '100%', height: 'auto'}} 
                className='productDetailsCarouselImage'
                onClick={carouselClickHandler}
                id={`idForBorder${'2'}`} 
              />
            </Dot>
          </Slide>
          <Slide index={3}>
            <Dot slide={3} className='productDetailsCarouselDot'>
              <img src='https://i.imgur.com/VQBuiSz.jpg' alt={`Slide 4`} style={{width: '100%', height: 'auto'}} 
              className='productDetailsCarouselImage'
              id={`idForBorder${'3'}`}
              onClick={carouselClickHandler}
              />
            </Dot>
          </Slide>
        </Slider>
        









        {/* <div className='d-flex w-100'>
          <Dot slide={0}>
            <img src='https://i.imgur.com/T7pSpXB.jpg' alt={`Slide 1`} style={{width: '100%', height: 'auto'}}/>
          </Dot>
          <Dot slide={1}>
            <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} style={{width: '100%', height: 'auto'}}/>
          </Dot>
          <Dot slide={2}>
            <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} style={{width: '100%', height: 'auto'}}/>
          </Dot>
          <Dot slide={3}>
            <img src='https://i.imgur.com/VQBuiSz.jpg' alt={`Slide 4`} style={{width: '100%', height: 'auto'}}/>
          </Dot>
        </div> */}

        {/* <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext> */}
      </CarouselProvider>
      {/* <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={3}
        visibleSlides={3}
      >
        <Slider>
            <Dot slide={0}>
                <img src='https://i.imgur.com/T7pSpXB.jpg' alt={`Slide 1`} style={{width: '100%', height: '100%'}}/>
            </Dot>
            <Dot slide={1}>
              <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} style={{width: '100%', height: '100%'}}/>
            </Dot>
            <Dot slide={2}>
              <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} style={{width: '100%', height: '100%'}}/>
            </Dot>
        </Slider> */}


        {/* <Slider>
          <Slide index={0}>
            <Dot slide={0}>
                <img src='https://i.imgur.com/T7pSpXB.jpg' alt={`Slide 1`} style={{width: '100%', height: '100%'}}/>
            </Dot>
          </Slide>
          <Slide index={1}>
            <Dot slide={1}>
              <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} style={{width: '100%', height: '100%'}}/>
            </Dot>
          </Slide>
          <Slide index={2}>
            <Dot slide={2}>
              <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} style={{width: '100%', height: '100%'}}/>
            </Dot>
          </Slide>
        </Slider> */}
        {/* <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext> */}
      {/* </CarouselProvider> */}





    </>
  )
}

export default ProductDetailsCarousel;


