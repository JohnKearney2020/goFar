import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot } from 'pure-react-carousel';

import VideoModal from '../Modals/VideoModal';
import 'pure-react-carousel/dist/react-carousel.es.css';
// https://github.com/express-labs/pure-react-carousel
import './ProductDetailsCarousel.css';

const ProductDetailsCarousel = ({ colorFromUrl, product }) => {
  // console.log('in top')
  const[primaryImage, setPrimaryImage] = useState('');
  const[videoClicked, setVideoClicked] = useState(false);
  // console.log('product');
  // console.log(product);
  // console.log(`color from url: ${colorFromUrl}`)
  // let primaryImageP = '';
  let ProductColorImages = [];
  let combinedImagesForCarousel = [];
  let videoSlideOffset = 0;


  // if(product.images) {
  //   let imageObjArray = product.images;
  //   console.log('imageObjArray:')
  //   console.log(imageObjArray)
  //   console.log('colorImages:')
  //   console.log(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)])

  //   // primaryImageP = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source
  //   // setPrimaryImage(primaryImageP);
  //   ProductColorImages = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.map(i => i.source);
  //   combinedImagesForCarousel = ProductColorImages.concat(product.defaultImages);

  //   if(product.defaultVideo){
  //     videoSlideOffset = 1;
  //   }
  // }

  useEffect(() => {
    // console.log('in useEffect')
    if(product.images !== undefined && primaryImage === ''){ //should only run once on the initial load
      console.log('changing primary image')
      setPrimaryImage(product.images[product.images.findIndex(index => index.color === colorFromUrl)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
    }

    if(product.images) {
      let imageObjArray = product.images;
      // console.log('imageObjArray:')
      // console.log(imageObjArray)
      // console.log('colorImages:')
      // console.log(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)])
  
      // primaryImageP = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source
      // setPrimaryImage(primaryImageP);
      ProductColorImages = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.map(i => i.source);
      combinedImagesForCarousel = ProductColorImages.concat(product.defaultImages);
  
      if(product.defaultVideo){
        videoSlideOffset = 1;
      }
    }

  // }, [primaryImage, colorFromUrl, product.images])
  }, [])

  const carouselClickHandler = (e) => {
      setPrimaryImage(e.target.src)
  }

  const videoHandler = (e) => {
    // setVideoSource(e.target.dataset.videosource);
    setVideoClicked(true);
  }
  const closeModalHandler = () => {
    setVideoClicked(false);
  }
  // let imageObjArray = product.images;
  // console.log(imageObjArray)
  // let primaryImage =imageObjArray[imageObjArray.findIndex(i => i.color === colorFromUrl)].
  // let primaryImage = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromUrl)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source

  // const[videoSource, setVideoSource] = useState('');
  // const[videoClicked, setVideoClicked] = useState(false);

  // console.log(typeof colorImagesForCarousel)
  // console.log(colorImagesForCarousel)
  // const combinedImagesForCarousel = colorImagesForCarousel.concat(productDefaultImages);
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

  // const videoHandler = (e) => {
    // setVideoSource(e.target.dataset.videosource);
    // setVideoClicked(true);
    // const imagesWithBorders = document.getElementsByClassName('productDetailsCarouselImage');
    // for(let eachImage of imagesWithBorders){
    //   eachImage.classList.remove('selectedBorderCarousel');
    // }
    // setTimeout(() => {
    //   console.log(`videoClicked is now: ${videoClicked}`)
    // }, 2500);
  // }



  //==============================================================================================
  //                                  Video Slide Indexing
  //==============================================================================================
  // if the product has a default video, we make it the first slide in our carousel below
  // if we do this, we need to offset the index of the other slides by +1 to account for that
  // if we don't have a video, there is no offset, and life continues as normal.
  // let videoSlideOffset = 0;
  // if(productDefaultVideo){
  //   videoSlideOffset = 1;
  // }

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
                {product.defaultVideo &&
                  <Slide index={0} key={0}>
                    <Dot slide={0} className='productDetailsCarouselDot' disabled={false}>
                      <div className='carouselVideo' onClick={videoHandler} data-videosource={product.defaultVideo}>
                      </div>
                      <iframe width='100%' height='100%' src={product.defaultVideo} title={`${product.name} video`} frameBorder="0"></iframe>
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
              source={product.defaultVideo}
              productName={product.name} 
          />}
        </>      
      }
    </>
  )
}

export default ProductDetailsCarousel;