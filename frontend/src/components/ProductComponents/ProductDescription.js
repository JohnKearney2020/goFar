import React from 'react';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactHtmlParser from 'react-html-parser';

const ProductDescription = ({ descriptionsArray }) => {
  return (
    <>
      <h5 className='my-4 font-weight-bold'>Product Description</h5>
      {descriptionsArray.map((eachDescription,idx)=> (
        <p className='my-4' key={idx}>{ ReactHtmlParser(eachDescription) }</p>
      ))}
    </>
  )
}

export default ProductDescription;
