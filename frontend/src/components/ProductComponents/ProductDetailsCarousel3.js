// import React, { useState, useEffect } from 'react';
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ImageWithZoom, Dot } from 'pure-react-carousel';
// import { useDispatch, useSelector } from 'react-redux';

// import VideoModal from '../Modals/VideoModal';
// import 'pure-react-carousel/dist/react-carousel.es.css';
// // https://github.com/express-labs/pure-react-carousel
// import './ProductDetailsCarousel.css';

// const ProductDetailsCarousel = ({ colorFromURL, product }) => {
//   // console.log(colorFromURL);
//   // console.log(product);
//   // const productDetails = useSelector(state => state.productDetails);
//   // const { loading, error, product, loaded } = productDetails;


//   // let imageObjArray;
//   // let sizeObjArray;
//   // let combinedImagesForCarousel;

//   const [primaryImage, setPrimaryImage] = useState('');
//   // let primaryImage = '';
//   const [imagesForCarousel, setImagesForCarousel] = useState([]);
//   const [combinedImagesForCarousel, setCombinedImagesForCarousel] = useState([]);
//   const[videoSource, setVideoSource] = useState('');
//   const[videoClicked, setVideoClicked] = useState(false);
//   const[productDefaultVideo, setProductDefaultVideo] = useState('');
//   const[videoSlideOffset, setVideoSlideOffset] = useState(0);
//   const[finalLoad, setFinalLoad] = useState(false);

//   // imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source

//   useEffect(() => {
//     console.log('in the useEffect() function');
//     if(product.images !== undefined) { 
//       const imageObjArray = [...product.images];
//       const sizeObjArray = [...product.sizes];
//       //==================================================================================================================
//       //                                                Initial Page Load
//       //==================================================================================================================
//       //These are things we need to set on the initial page load once we've retrieved the product from the global state
//       if(primaryImage === ''){ //we only want this to update on the very first initial page load
//         primaryImage = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source
//         // setPrimaryImage(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
//         // setPrimaryImage(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
//       }
//       if(imagesForCarousel === []){ //we only want this to update on the very first initial page load
//         let colorImages = imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.map(eachImgObj => eachImgObj.source);
//         if(product.defaultImages) { colorImages.concat(product.defaultImages) }
//         setImagesForCarousel(colorImages);
//       }

//       if(product.defaultVideo && product.defaultVideo === ''){ //we only want this to update on the very first initial page load
//         console.log('updating product video')
//         setProductDefaultVideo(product.defaultVideo);
//         setVideoSlideOffset(1);
//       }
//       // setCombinedImagesForCarousel(imagesForCarousel.concat(product.defaultImages))

//       // setCombinedImagesForCarousel(imagesForCarousel.concat(product.defaultImages))
//       // let combinedImagesForCarousel = imagesForCarousel.concat(product.defaultImages);
//       // console.log('combinedImagesForCarousel:');
//       // console.log(combinedImagesForCarousel);
//       // if(finalLoad === false) { setFinalLoad(true) };
//     }
//   }, [primaryImage, colorFromURL, product])

//   // console.log(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)])
//   // console.log(imageObjArray[imageObjArray.findIndex(index => index === 0)])
//   // const [primaryImage, setPrimaryImage] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.find(eachImage => eachImage.isPrimaryImage === true).source);
//   // const [imagesForCarousel, setColorImagesForCarousel] = useState(imageObjArray[imageObjArray.findIndex(index => index.color === colorFromURL)].colorImages.map(eachImgObj => eachImgObj.source));

//   // const productName = product.name;
//   // const productDefaultImages = product.defaultImages;
//   // const productDefaultVideo = product.defaultVideo;

//   // const[videoSource, setVideoSource] = useState('');
//   // const[videoClicked, setVideoClicked] = useState(false);

//   // const combinedImagesForCarousel = imagesForCarousel.concat(productDefaultImages);


//   const carouselClickHandler = (e) => {
//     // Change the main image to the one that was clicked
//     // setPrimaryImage(e.target.src)
//   }

//   const videoHandler = (e) => {
//     setVideoSource(e.target.dataset.videosource);
//     setVideoClicked(true);
//   }

//   // const closeModalHandler = () => {
//   //   setVideoClicked(false);
//   // }

//   //==============================================================================================
//   //                                  Video Slide Indexing
//   //==============================================================================================
//   // if the product has a default video, we make it the first slide in our carousel below
//   // if we do this, we need to offset the index of the other slides by +1 to account for that
//   // if we don't have a video, there is no offset, and life continues as normal.
//   // let videoSlideOffset = 0;
//   // if(productDefaultVideo){
//   //   videoSlideOffset = 1;
//   // }

//   console.log(`loaded: ${loaded}`)
//   console.log(`primary image: ${primaryImage}`)
//   return (
//     <>
//       {loaded && primaryImage && imagesForCarousel.length > 5 &&
//       // {finalLoad &&
//         (<>
//           <CarouselProvider
//             naturalSlideWidth={100}
//             naturalSlideHeight={100}
//             totalSlides={1}
//             visibleSlides={1}
//           >
//             <Slider>
//               <Slide>
//                 <ImageWithZoom src={primaryImage} alt={`Selected Image`}/>
//               </Slide>
//             </Slider>
//           </CarouselProvider>
//           <CarouselProvider
//             naturalSlideWidth={100}
//             naturalSlideHeight={100}
//             totalSlides={combinedImagesForCarousel.length + 1}
//             visibleSlides={3}
//             // touchEnabled={false}
//             dragEnabled={false}
//             infinite={true}
//             className='mt-3'
//           >
//             <div id='divForBackNextButtons'>
//               <Slider>
//                 {/* If the product has a video, make it the first slide */}
//                 {product.defaultVideo &&
//                   <Slide index={0} key={0}>
//                     <Dot slide={0} className='productDetailsCarouselDot' disabled={false}>
//                       <div className='carouselVideo' onClick={videoHandler} data-videosource={product.defaultVideo}>
//                       </div>
//                       <iframe width='100%' height='100%' src={product.defaultVideo} title={`${product.name} video`} frameBorder="0"></iframe>
//                     </Dot>                
//                   </Slide>
//                 }
//                 {/* The rest of the product image slides */}
//                 {combinedImagesForCarousel.map((eachImage, idx) => (
//                 // {imagesForCarousel.concat(product.defaultImages).map((eachImage, idx) => (
//                   <Slide index={idx + videoSlideOffset} key={idx + videoSlideOffset}>
//                     <Dot slide={idx + videoSlideOffset} className='productDetailsCarouselDot' disabled={false}>
//                       <img src={eachImage} alt={`Slide ${idx + videoSlideOffset}`} style={{width: '100%', height: 'auto'}} 
//                       className='productDetailsCarouselImage'
//                       id={`idForBorder${idx + videoSlideOffset}`}
//                       onClick={carouselClickHandler}
//                       />
//                     </Dot>                
//                   </Slide>
//                 ))}
//               </Slider>
//               <ButtonBack id='backButton'><i className="fas fa-chevron-left"></i></ButtonBack>
//               <ButtonNext id='nextButton'><i className="fas fa-chevron-right"></i></ButtonNext>
//             </div>
//           </CarouselProvider>
//         </>)
//       }
//     </>
        
//   )
// }

// export default ProductDetailsCarousel;
