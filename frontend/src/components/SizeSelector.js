import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './SizeSelector.css';

const SizeSelector = ({ product, selectedColor, selectedSizeCategory, sizeSelectHandler, activeKey }) => {

  //Find what size buttons need to be displayed based on the color and sizeCategory the user selected
  let arrayOfSizes = [];
  for(let eachSizeCategory of product.sizes){
    if(eachSizeCategory.sizeCategoryName === selectedSizeCategory){
      for(let eachColor of eachSizeCategory.sizeCategoryColorsAndSizes){
        if(eachColor.color === selectedColor){
          for(let eachSize of eachColor.sizeCategorySizes){
            arrayOfSizes.push(eachSize);
          }
        }
      }
    }
  };

  return (
    <ListGroup horizontal className='px-2' activeKey={activeKey}>
      {arrayOfSizes.map((eachSizeObject,idx) => (
        eachSizeObject.qty === 0 ? //if the qty for that size is zero, in other words Out of Stock
          (<ListGroup.Item key={idx} disabled className='mx-2 leftBorderFix d-flex align-items-center justify-content-center sizeButton'>
            <div className='ribbon'></div>
            <span>{eachSizeObject.size}</span>
          </ListGroup.Item>) : //if we do have some of that color in stock
          (<ListGroup.Item key={idx} action eventKey={idx} className='mx-2 leftBorderFix sizeButton' value={eachSizeObject.size} onClick={sizeSelectHandler}>
            {eachSizeObject.size}
          </ListGroup.Item>)
      ))}
    </ListGroup>
  )
}

export default SizeSelector;


