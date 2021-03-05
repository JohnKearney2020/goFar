import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import './SizeSelector.css';

const SizeSelector = ({ product, selectedColor, selectedSizeCategory, sizeSelectHandler, activeKey, loaded }) => {

  //Find what size buttons need to be displayed based on the color and sizeCategory the user selected
  const [arrayOfSizes, setArrayOfSizes] = useState([]);

  useEffect(() => {
    if(loaded && selectedSizeCategory !== ''){
      const sizeObjArray = [...product.sizes];
      let levelOne = sizeObjArray[sizeObjArray.findIndex(i => i.sizeCategoryName === selectedSizeCategory)].sizeCategoryColorsAndSizes;
      let levelTwo = levelOne[levelOne.findIndex(i => i.color === selectedColor)].sizeCategorySizes;
      let tempArrayOfSizes = levelTwo.map((eachSize,idx) => (
        eachSize
      ))
      setArrayOfSizes(tempArrayOfSizes);
    }
  }, [loaded, product.sizes, selectedColor, selectedSizeCategory])

  return (
    <ListGroup horizontal className='px-2 pb-3' activeKey={activeKey}>
      {arrayOfSizes.map((eachSizeObject,idx) => (
        eachSizeObject.qty === 0 ? //if the qty for that size is zero, in other words Out of Stock
          //'action' prop is passed even though these items are disabled b/c it has some effect on the size of the item
          (<ListGroup.Item key={idx} action disabled className='mx-1 leftBorderFix d-flex align-items-center justify-content-center sizeButton'>
            <div className='ribbon'></div>
            <span>{eachSizeObject.size}</span>
          </ListGroup.Item>) : //if we do have some of that color in stock
          (<ListGroup.Item 
          key={idx} 
          action 
          eventKey={idx} 
          className='mx-1 leftBorderFix d-flex align-items-center justify-content-center sizeButton' 
          value={eachSizeObject.size} 
          onClick={sizeSelectHandler}
          data-keyforactivekey={idx}
          >
            {eachSizeObject.size}
          </ListGroup.Item>)
      ))}
    </ListGroup>
  )
}

export default SizeSelector;


