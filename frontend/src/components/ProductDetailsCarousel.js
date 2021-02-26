import React, { useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot } from 'pure-react-carousel';

import VideoModal from '../components/Modals/VideoModal';
import 'pure-react-carousel/dist/react-carousel.es.css';
// https://github.com/express-labs/pure-react-carousel
import './ProductDetailsCarousel.css';

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

  //==============================================================================================
  //                                  Video Slide Indexing
  //==============================================================================================
  // if the product has a default video, we make it the first slide in our carousel below
  // if we do this, we need to offset the index of the other slides by +1 to account for that
  // if we don't have a video, there is no offset, and life continues as normal.
  let videoSlideOffset = 0;
  if(productDefaultVideo){
    videoSlideOffset = 1;
  }

  return (
    <>
      {/* The selected, zoomable image */}
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={1}
        visibleSlides={1}
      >
        <Slider>
          <Slide>
            <ImageWithZoom src={primaryImage} alt={`Slide 1`}/>
          </Slide>
        </Slider>
      </CarouselProvider>
      {/* Carousel containing the rest of the product images and a video if there is one */}
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={combinedImagesForCarousel.length + 1}
        visibleSlides={3}
        // touchEnabled={false}
        dragEnabled={false}
        infinite={true}
        className='mt-3'
      >
        <div id='divForBackNextButtons'>
          <Slider>
            {/* If the product has a video, make it the first slide */}
            {productDefaultVideo &&
              <Slide index={0} key={0}>
                <Dot slide={0} className='productDetailsCarouselDot' disabled={false}>
                  <div className='carouselVideo' onClick={videoHandler} data-videosource={productDefaultVideo}>
                  </div>
                  <iframe width='100%' height='100%' src={productDefaultVideo} title={`${productName} video`} frameBorder="0"></iframe>
                </Dot>                
              </Slide>
            }
            {/* The rest of the product image slides */}
            {combinedImagesForCarousel.map((eachImage, idx) => (
              <Slide index={idx + videoSlideOffset} key={idx + videoSlideOffset}>
                <Dot slide={idx + videoSlideOffset} className='productDetailsCarouselDot' disabled={false}>
                  <img src={eachImage} alt={`Slide ${idx + videoSlideOffset}`} style={{width: '100%', height: 'auto'}} 
                  className='productDetailsCarouselImage'
                  id={`idForBorder${idx + videoSlideOffset}`}
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
      {/* If the user clicks the video */}
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
