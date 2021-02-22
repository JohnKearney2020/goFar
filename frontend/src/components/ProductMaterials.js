import React from 'react';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactHtmlParser from 'react-html-parser';

const ProductMaterials = ({ materialsArray }) => {
  return (
    <>
      <h5 className='my-4 font-weight-bold'>Materials</h5>
      <ul>
        {materialsArray.map((eachMaterial,idx)=> (
          <li className='my-2' key={idx}>{ ReactHtmlParser(eachMaterial) }</li>
        ))}
      </ul>    
    </>
  )
}

export default ProductMaterials;
