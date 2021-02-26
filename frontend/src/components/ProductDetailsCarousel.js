import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot, DotGroup, Image } from 'pure-react-carousel';
import Modal from 'react-bootstrap/Modal';

import Backdrop from '../components/Modals/Backdrop';
import VideoModal from '../components/Modals/VideoModal';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import { Carousel } from 'react-bootstrap';

// https://github.com/express-labs/pure-react-carousel


import './ProductDetailsCarousel.css';
// import { set } from 'mongoose';

const ProductDetailsCarousel = ({ 
  primaryImage,
  productName,
  carouselClickHandler, 
  colorImagesForCarousel,
  productDefaultImages,  
  productDefaultVideo
}) => {


  const[videoSource, setVideoSource] = useState('');
  const[videoClicked, setVideoClicked] = useState(false);

  // console.log(typeof colorImagesForCarousel)
  // console.log(colorImagesForCarousel)
  const combinedImagesForCarousel = colorImagesForCarousel.concat(productDefaultImages);
  // console.log(typeof combinedImagesForCarousel);
  // console.log(combinedImagesForCarousel)
  // const copy = combinedImagesForCarousel.map((eachImage, idx) => (
  //   console.log(eachImage)
  // ))

  // const carouselClickHandler = (e) => {
  //   // Change the main image to the one that was clicked
  //   setSelectedImage(e.target.src);

  //   //remove existing borders
  //   // const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
  //   // for(let eachImage of imagesWithBorders){
  //   //   eachImage.classList.remove('selectedBorderCarousel');
  //   // }
  //   //Add the border to the clicked image
  //   // const imageForBorder = document.getElementById(e.target.id);
  //   // imageForBorder.classList.add('selectedBorderCarousel');
  // }

  const videoHandler = (e) => {
    setVideoSource(e.target.dataset.videosource);
    setVideoClicked(true);
    // const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
    // for(let eachImage of imagesWithBorders){
    //   eachImage.classList.remove('selectedBorderCarousel');
    // }
    // setTimeout(() => {
    //   console.log(`videoClicked is now: ${videoClicked}`)
    // }, 2500);
  }

  const closeModalHandler = () => {
    setVideoClicked(false);
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
            {/* <ImageWithZoom src={selectedImage || primaryImage} alt={`Slide 1`}/> */}
            <ImageWithZoom src={primaryImage} alt={`Slide 1`}/>
          </Slide>
        </Slider>
      </CarouselProvider>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={combinedImagesForCarousel.length}
        visibleSlides={3}
        // touchEnabled={false}
        dragEnabled={false}
        className='mt-3'
      >
        <div id='divForBackNextButtons'>
          <Slider>
            {combinedImagesForCarousel.map((eachImage, idx) => (
              <Slide index={idx} key={idx}>
                <Dot slide={idx} className='productDetailsCarouselDot' disabled={false}>
                  <img src={eachImage} alt={`Slide ${idx}`} style={{width: '100%', height: 'auto'}} 
                  className='productDetailsCarouselImage'
                  id={`idForBorder${idx}`}
                  onClick={carouselClickHandler}
                  />
                </Dot>                
              </Slide>
            ))}
          </Slider>
          <ButtonBack id='backButton'><i className="fas fa-chevron-left"></i></ButtonBack>
          <ButtonNext id='nextButton'><i className="fas fa-chevron-right"></i></ButtonNext>
        </div>
      </CarouselProvider>

      {/* {videoClicked && <Backdrop videoHandler={videoHandler}/>} */}
      {videoClicked && 
        <VideoModal 
          show={videoClicked}
          closeModalHandler={closeModalHandler} 
          source={videoSource}
          productName={productName} 
        />}
    </>
  )
}

export default ProductDetailsCarousel;


            {/* <Slide index={0}>
              <Dot slide={0} className='productDetailsCarouselDot' disabled={false}>
                <img src='https://i.imgur.com/T7pSpXB.jpg' alt={`Slide 1`} style={{width: '100%', height: 'auto'}} 
                className='productDetailsCarouselImage'
                id={`idForBorder${'0'}`}
                onClick={carouselClickHandler}
                />
              </Dot>
            </Slide>
            <Slide index={1}>
              <Dot slide={1} className='productDetailsCarouselDot' disabled={false}>
                <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} style={{width: '100%', height: 'auto'}} 
                  className='productDetailsCarouselImage'
                  onClick={carouselClickHandler}
                  id={`idForBorder${'2'}`} 
                />
              </Dot>
            </Slide>
            <Slide index={2}>
              <Dot slide={2} className='productDetailsCarouselDot' disabled={false} data-videosource='https://www.youtube.com/embed/t2MGytLDf4I'>
                <div className='carouselVideo' onClick={videoHandler} data-videosource='https://www.youtube.com/embed/t2MGytLDf4I'>
                </div>
                <iframe width='100%' height='100%' src="https://www.youtube.com/embed/t2MGytLDf4I" frameBorder="0"></iframe>
              </Dot>
            </Slide>
            <Slide index={3}>
              <Dot slide={3} className='productDetailsCarouselDot' disabled={false}>
                <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} style={{width: '100%', height: 'auto'}} 
                  onClick={carouselClickHandler} 
                  className='productDetailsCarouselImage'
                  id={`idForBorder${'1'}`} 
                />
              </Dot>
            </Slide>
            <Slide index={4}>
              <Dot slide={4} className='productDetailsCarouselDot' disabled={false}>
                <img src='https://i.imgur.com/VQBuiSz.jpg' alt={`Slide 4`} style={{width: '100%', height: 'auto'}} 
                className='productDetailsCarouselImage'
                id={`idForBorder${'3'}`}
                onClick={carouselClickHandler}
                />
              </Dot>
            </Slide> */}