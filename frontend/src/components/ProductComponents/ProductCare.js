import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ProductCare = ({ careArray }) => {
  return (
    <>
      <h5 className='my-4 font-weight-bold'>Care</h5>
      {careArray.map((eachCare,idx)=> (
        <p className='my-4' key={idx}>{ ReactHtmlParser(eachCare) }</p>
      ))}      
    </>
  )
}

export default ProductCare;
