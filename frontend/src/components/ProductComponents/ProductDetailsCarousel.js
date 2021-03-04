import React, { useState, useEffect } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot } from 'pure-react-carousel';
import { useDispatch, useSelector } from 'react-redux';

import VideoModal from '../Modals/VideoModal';
import 'pure-react-carousel/dist/react-carousel.es.css';
// https://github.com/express-labs/pure-react-carousel
import './ProductDetailsCarousel.css';

const ProductDetailsCarousel = ({ colorFromURL }) => {
  // console.log(colorFromURL);
  // console.log(product);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product, loaded } = productDetails;


  let imageObjArray;
  let sizeObjArray;
  const [primaryImage, setPrimaryImage] = useState();

  // imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source

  useEffect(() => {
    // console.log(product.images);
    if(product.images !== undefined) { 
      console.log(product.images);
      setPrimaryImage(product.images[product.images.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
    }

    // console.log(product.images[product.images.findIndex(i => i.color === 'Black')]);
    // product.images.findIndex(i => i.color === 'Black');
    // imageObjArray = product.images;
    // console.log('imageObjArray:');
    // console.log(imageObjArray);
    // // sizeObjArray = [...product.sizes];
    // // imageObjArray.forEach(eachIndex => {
    // //   console.log(eachIndex)
    // // })
    // // setPrimaryImage = setPrimaryImage(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
    // setPrimaryImage(product.images.findIndex(index => index.color === colorFromURL).colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);

    // setPrimaryImage(pre => ({
    //   ...pre,
    //   '': product.images.findIndex(index => index.color === colorFromURL).colorImages.find(eachImage => eachImage.isPrimaryImage === true).source || ''
    // }))
    // setMovies(pre => ({
    //   ...pre,
    //   movies: data || []
    // }))

  }, [])

  // console.log(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)])
  // console.log(imageObjArray[imageObjArray.findIndex(index => index === 0)])
  // const [primaryImage, setPrimaryImage] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
  // const [colorImagesForCarousel, setColorImagesForCarousel] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.map(eachImgObj => eachImgObj.source));

  // const productName = product.name;
  // const productDefaultImages = product.defaultImages;
  // const productDefaultVideo = product.defaultVideo;

  // const[videoSource, setVideoSource] = useState('');
  // const[videoClicked, setVideoClicked] = useState(false);

  // const combinedImagesForCarousel = colorImagesForCarousel.concat(productDefaultImages);


  // const carouselClickHandler = (e) => {
  //   // Change the main image to the one that was clicked
  //   setPrimaryImage(e.target.src)
  // }

  // const videoHandler = (e) => {
  //   setVideoSource(e.target.dataset.videosource);
  //   setVideoClicked(true);
  // }

  // const closeModalHandler = () => {
  //   setVideoClicked(false);
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
      In product carousel
      <h1>{product.name}</h1>
      <img src={primaryImage}></img>
      {/* <img src={product.images[product.images.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source}></img> */}
    </>
  )
}

export default ProductDetailsCarousel;
