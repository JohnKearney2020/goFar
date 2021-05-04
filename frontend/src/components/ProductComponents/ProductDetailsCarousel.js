import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot } from 'pure-react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import VideoModal from '../Modals/VideoModal';
import 'pure-react-carousel/dist/react-carousel.es.css';
// https://github.com/express-labs/pure-react-carousel
import './ProductDetailsCarousel.css';

const ProductDetailsCarousel = ({ colorFromUrl, product, loaded, selectedColor, setPrimaryImageForColor }) => {

  const[primaryImage, setPrimaryImage] = useState('');
  // const[primaryImage, setPrimaryImage] = useState('');
  const[videoClicked, setVideoClicked] = useState(false);
  const[combinedImagesForCarousel, setCombinedImagesForCarousel] = useState([]);
  const[videoSlideOffset, setVideoSlideOffset] = useState(0);

  // let ProductColorImages = [];
  // let videoSlideOffset = 0;
  // console.log(`loaded: ${loaded}`)

  useEffect(() => {
    // console.log('in ProductDetailsCarousel useEffect()')
    // if(product.images !== undefined && primaryImage === ''){ //should only run once on the initial load
    if(loaded === true){ //should only run once on the initial load
      // console.log('changing primary image')
      let imageObjArray = [...product.images];
      let productColorImages;
      if(selectedColor === ''){ //set PrimaryImage based on color in URL. see defaultProps at end of this component
        let primaryImage = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source;
        setPrimaryImage(primaryImage); //Primary image for the carousel
        setPrimaryImageForColor(primaryImage); //Primary image for that color used by the cart and wishlist
        productColorImages = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.map(i => i.source);
      } else { //set primary image
        let primaryImage = imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source;
        setPrimaryImage(primaryImage);
        setPrimaryImageForColor(primaryImage); //Primary image for that color used by the cart and wishlist
        productColorImages = imageObjArray[imageObjArray.findIndex(index => index.color === selectedColor)].colorImages.map(i => i.source);
      }
      // let productColorImages = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.map(i => i.source);
      console.log(`for ${product.name}`)
      console.log('productColorImages:')
      console.log(productColorImages)
      console.log('defaultImages:')
      console.log(product.defaultImages)
      setCombinedImagesForCarousel(productColorImages.concat(product.defaultImages))
      // if the product has a default video, we make it the first slide in our carousel below
      // if we do this, we need to offset the index of the other slides by +1 to account for that
      // if we don't have a video, there is no offset, and life continues as normal.
      if(product.defaultVideo){
        setVideoSlideOffset(1);
    }

    // if(product.images) {
    //   let imageObjArray = product.images;
    //   let ProductColorImages = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.map(i => i.source);
    //   setCombinedImagesForCarousel(ProductColorImages.concat(product.defaultImages))
    //   // if the product has a default video, we make it the first slide in our carousel below
    //   // if we do this, we need to offset the index of the other slides by +1 to account for that
    //   // if we don't have a video, there is no offset, and life continues as normal.
    //   if(product.defaultVideo){
    //     // videoSlideOffset = 1;
    //     setVideoSlideOffset(1);
    //   }
    }

  // }, [primaryImage, colorFromUrl, product.images])
  // }, [loaded, colorFromUrl, product.defaultImages, product.defaultVideo, product.images])
  }, [colorFromUrl, loaded, product.defaultImages, product.defaultVideo, product.images, selectedColor, setPrimaryImageForColor]);

  const carouselClickHandler = (e) => {
      setPrimaryImage(e.target.src) // Change the main image to the one that was clicked
  }

  const videoHandler = (e) => {
    // setVideoSource(e.target.dataset.videosource);
    setVideoClicked(true);
  }
  const closeModalHandler = () => {
    setVideoClicked(false);
  }

  return (
    <>
      { primaryImage &&
        <>
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
            totalSlides={product.defaultVideo ? combinedImagesForCarousel.length + 1 : combinedImagesForCarousel.length}
            visibleSlides={3}
            // touchEnabled={false}
            dragEnabled={false}
            infinite={true}
            className='mt-3'
          >
            <div id='divForBackNextButtons'>
              <Slider>
                {/* If the product has a video, make it the first slide */}
                {product.defaultVideo &&
                  <Slide index={0} key={0} id='videoSlide'>
                    <FontAwesomeIcon className='carouselPlayIcon' icon={faPlay} size="3x" onClick={videoHandler}/>
                    <Dot slide={0} className='productDetailsCarouselDot' disabled={false} onClick={videoHandler}>
                      <img src={product.videoThumbnail} alt={`Slide 0 - Product Video`} 
                          className='productDetailsCarouselImage'
                          id={`idForBorder0`}
                      />
                    </Dot>                
                  </Slide>
                }
                {/* The rest of the product image slides */}
                {combinedImagesForCarousel.map((eachImage, idx) => (
                  <Slide index={idx + videoSlideOffset} key={idx + videoSlideOffset}>
                    <Dot slide={idx + videoSlideOffset} className='productDetailsCarouselDot' disabled={false}>
                      <img src={eachImage} alt={`Slide ${idx + videoSlideOffset}`} 
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
          {/* If the user clicks the video slide*/}
          {videoClicked && 
            <VideoModal 
              show={videoClicked}
              closeModalHandler={closeModalHandler} 
              source={product.defaultVideo}
              productName={product.name} 
          />}
        </>      
      }
    </>
  )
}

// If the 'productScreenTest' doesn't pass down this prop set it to ''. We have logic in the useEffect() based on this prop's value
ProductDetailsCarousel.defaultProps = {
  selectedColor: ''
}


export default ProductDetailsCarousel;