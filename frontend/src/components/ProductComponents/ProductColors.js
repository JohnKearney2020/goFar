import React from 'react';
import { Image } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import './ProductColors.css';

const ProductColors = ({ images, colorSelectHandler, productColorsArray, colorFromUrl }) => {

  // const fromHomeScreen = () => {
  //   for(let eachColor of colorsButtons) {
  //     eachColor.classList.remove('colorButtonActiveBorder');
  //   }
  // }

  const newColorClickedHandler = (e) => {
    colorSelectHandler(e.target.dataset.color); //its expecting a color name as a string, ex: 'seapine'
    const colorsButtons = document.getElementsByClassName('colorButton');
    for(let eachColor of colorsButtons) {
      eachColor.classList.remove('colorButtonActiveBorder');
    }
    const activeColor = document.getElementById(e.target.id);
    activeColor.classList.add('colorButtonActiveBorder')
  }

  return (
      <>
        {productColorsArray.length === 1 ?
          <Image src={productColorsArray[0].tinyImage} roundedCircle thumbnail className="mr-1 colorButton colorButtonActiveBorderPermanent" 
          key={productColorsArray[0].tinyImage}
          data-color={productColorsArray[0].colorName}
          id={uuidv4()}
          /> :
          images.map((eachColorImage,idx) => (
            <Image src={eachColorImage.tinyImage} 
            roundedCircle 
            thumbnail 
            className={`mr-1 colorButton ${eachColorImage.colorName === colorFromUrl ? 'colorButtonActiveBorder' : ''}`}
            // className={`mr-1 colorButton`}
            key={eachColorImage.tinyImage}
            data-color={eachColorImage.colorName}
            onClick={newColorClickedHandler}
            id={uuidv4()}
            />
          ))
        }
        {/* {images.map((eachColorImage,idx) => (
          <Image src={eachColorImage.tinyImage} roundedCircle thumbnail className="mr-1 colorButton" 
          key={eachColorImage.tinyImage}
          data-color={eachColorImage.colorName}
          onClick={productColorsArray ? (productColorsArray.length > 1 ? newColorClickedHandler : null) : null}
          id={uuidv4()}
          />
        ))} */}
      </>
  )
}

export default ProductColors;
