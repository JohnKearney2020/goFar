import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const ProductFeatures = ({ featuresArray }) => {
  return (
    <>
      <h5 className='my-4 font-weight-bold'>Features</h5>
      <ul>
        {featuresArray.map((eachFeature,idx)=> (
          <li className='my-2' key={idx}>{ ReactHtmlParser(eachFeature) }</li>
        ))}
      </ul>
    </>
  )
}

export default ProductFeatures;
