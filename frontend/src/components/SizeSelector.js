import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './SizeSelector.css';

const SizeSelector = ({ product, selectedColor, selectedSizeCategory }) => {
  // let arrayOfSizes = [{
  //   size: 'XL'
  // }];
  let arrayOfSizes = [];
  // console.log(`selectedSizeCategory: ${selectedSizeCategory}`)
  // console.log(product.sizes);


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
    <ListGroup horizontal defaultActiveKey='0' className='px-2'>
      {arrayOfSizes.map((eachSizeObject,idx) => (
        // <ListGroup.Item key={idx} action eventKey={idx} className='mx-3'>
        eachSizeObject.qty === 0 ?
          (<ListGroup.Item key={idx} disabled className='mx-2 leftBorderFix'>
            <del className='text-danger'>{eachSizeObject.size}</del>
          </ListGroup.Item>) :
          (<ListGroup.Item key={idx} action eventKey={idx} className='mx-2 leftBorderFix'>
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


