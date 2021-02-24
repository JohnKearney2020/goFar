import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot, DotGroup, Image } from 'pure-react-carousel';
import Modal from 'react-bootstrap/Modal';

import Backdrop from '../components/Modals/Backdrop';
import VideoModal from '../components/Modals/VideoModal';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import { Carousel } from 'react-bootstrap';

// https://github.com/express-labs/pure-react-carousel


import './ProductDetailsCarousel.css';
import { set } from 'mongoose';

const ProductDetailsCarousel = ({ primaryImage, productName }) => {

  const[selectedImage, setSelectedImage] = useState(primaryImage);
  const[videoSource, setVideoSource] = useState('');
  const[videoClicked, setVideoClicked] = useState(false);

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

  const videoHandler = (e) => {
    // console.log('video handler clicked!');
    // console.log(e.target.dataset.videosource)
    // console.log(`before we change it, videoClicked is: ${videoClicked}`)
    // videoClicked === true ? setVideoClicked(false) : setVideoClicked(true);
    // if(videoClicked === true){
    //   console.log('true, setting to false');
    //   setVideoClicked(false);
    // } else {
    //   console.log('false, setting to true');
    //   setVideoClicked(true);
    // }
    // setVideoClicked(!videoClicked);
    setVideoSource(e.target.dataset.videosource);
    const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
    for(let eachImage of imagesWithBorders){
      eachImage.classList.remove('selectedBorderCarousel');
    }
    setVideoClicked(true);
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
            <ImageWithZoom src={selectedImage} alt={`Slide 1`}/>
          </Slide>
        </Slider>
      </CarouselProvider>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={5}
        visibleSlides={3}
        // touchEnabled={false}
        // dragEnabled={false}
        className='mt-3'
      >
        <div id='divForBackNextButtons'>
          <Slider>
            <Slide index={0}>
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
                <img src='https://i.imgur.com/ILPYxGF.jpg' alt={`Slide 2`} style={{width: '100%', height: 'auto'}} 
                  onClick={carouselClickHandler} 
                  className='productDetailsCarouselImage'
                  id={`idForBorder${'1'}`} 
                />
              </Dot>
            </Slide>
            <Slide index={2}>
              <Dot slide={2} className='productDetailsCarouselDot' disabled={false}>
                <img src='https://i.imgur.com/udaTRbn.jpg' alt={`Slide 3`} style={{width: '100%', height: 'auto'}} 
                  className='productDetailsCarouselImage'
                  onClick={carouselClickHandler}
                  id={`idForBorder${'2'}`} 
                />
              </Dot>
            </Slide>
            <Slide index={3}>
              <Dot slide={3} className='productDetailsCarouselDot' disabled={false}>
                <img src='https://i.imgur.com/VQBuiSz.jpg' alt={`Slide 4`} style={{width: '100%', height: 'auto'}} 
                className='productDetailsCarouselImage'
                id={`idForBorder${'3'}`}
                onClick={carouselClickHandler}
                />
              </Dot>
            </Slide>
            <Slide index={4}>
              <Dot slide={4} className='productDetailsCarouselDot' disabled={false} data-videosource='https://www.youtube.com/embed/t2MGytLDf4I'>
                <div className='carouselVideo' onClick={videoHandler} data-videosource='https://www.youtube.com/embed/t2MGytLDf4I'>
                </div>
                {/* <iframe width='100%' height='100%' src="https://www.youtube.com/embed/t2MGytLDf4I" frameBorder="0"></iframe> */}
                {/* <video width='100%' height='100%' controls>
                  <source src='/videos/video-microtherm2-0.mp4' type='video/mp4'/>
                </video> */}
              </Dot>
            </Slide>
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
      {/* {videoClicked && 
        <Modal show={videoClicked} onHide={closeModalResetHandler} dialogClassName='productCarouselVideoModal' contentClassName='productCarouselVideoModalContent' centered restoreFocus={false} style={{opacity:1}} animation={false}>
          <Modal.Header closeButton />
          <Modal.Body> */}
            {/* <iframe width="100%" height="100%" src={source} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
          {/* </Modal.Body>
        </Modal> */}
      {/* } */}
    </>
  )
}

export default ProductDetailsCarousel;


