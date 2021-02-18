import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './SizeSelector.css';

const SizeSelector = ({ product, selectedColor, selectedSizeCategory, sizeSelectHandler, changedSizeCategoryToggler, activeKey }) => {
// const SizeSelector = ({ product, selectedColor, selectedSizeCategory, sizeSelectHandler }) => {
  // let arrayOfSizes = [{
  //   size: 'XL'
  // }];
  let arrayOfSizes = [];
  // console.log(`selectedSizeCategory: ${selectedSizeCategory}`)
  // console.log(product.sizes);
  // console.log(changedSizeCategoryToggler)


  for(let eachSizeCategory of product.sizes){
    // console.log(eachSize.sizeCategoryName);
    // console.log(eachSizeCategory);
    if(eachSizeCategory.sizeCategoryName === selectedSizeCategory){
      // console.log('found matching size cat')
      for(let eachColor of eachSizeCategory.sizeCategoryColorsAndSizes){
        if(eachColor.color === selectedColor){
          // console.log(eachColor);
          for(let eachSize of eachColor.sizeCategorySizes){
            // console.log(eachSize);
            arrayOfSizes.push(eachSize);
          }
        }
      }
    }
  };

  // const leftBorderFix = {
  //   border-width: '1px'
  // };

  return (
    <ListGroup horizontal className='px-2' activeKey={activeKey}>
      {arrayOfSizes.map((eachSizeObject,idx) => (
        // <ListGroup.Item key={idx} action eventKey={idx} className='mx-3'>
        eachSizeObject.qty === 0 ?
          (<ListGroup.Item key={idx} disabled className='mx-2 leftBorderFix d-flex align-items-center justify-content-center sizeButton'>
            {/* <del className='text-danger'>{eachSizeObject.size}</del> */}
            {/* <span className='angledStrike withpadding'>{eachSizeObject.size}</span> */}
            <div className='ribbon'></div>
            <span>{eachSizeObject.size}</span>
          </ListGroup.Item>) :
          (<ListGroup.Item key={idx} action eventKey={idx} className='mx-2 leftBorderFix sizeButton' value={eachSizeObject.size} onClick={sizeSelectHandler}>
            {eachSizeObject.size}
          </ListGroup.Item>)
        // <ListGroup.Item key={idx} action eventKey={idx} className='mx-2 leftBorderFix'>
        //   {eachSizeObject.size}
        // </ListGroup.Item>
      ))}
    </ListGroup>
  )
}



export default SizeSelector;


