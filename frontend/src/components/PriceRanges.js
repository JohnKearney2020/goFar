import React from 'react';
import { findDefaultPriceRange, findSalePriceRange } from '../utilityFunctions/priceRanges';
import './PriceRanges.css';

const PriceRanges = ({ product }) => {
  let defaultPriceRange = findDefaultPriceRange(product.sizes);
  let salePriceRange = findSalePriceRange(product.sizes);
  let defaultPriceString = '';
  let salePriceString = '';
  // Find the string to represent the range of default prices, ex: '$59.99 - $69.99'
  defaultPriceRange.length > 1 ? defaultPriceString = `$${defaultPriceRange[0]} - $${defaultPriceRange[defaultPriceRange.length - 1]}` :
  defaultPriceString = `$${defaultPriceRange[0]}`;

  // Find the string to represent the range of sale prices, ex: '$59.99 - $69.99'
  salePriceRange.length > 1 ? salePriceString = `$${salePriceRange[0]} - $${salePriceRange[salePriceRange.length - 1]}` :
  salePriceString = `$${salePriceRange[0]}`;

  return (
    <>
      {salePriceRange.length === 0 ? <span>{defaultPriceString}</span> : 
      salePriceRange.length === 1 ? <span><s>{defaultPriceString}</s> <span className='text-danger'>{salePriceString}</span></span> : 
      <span><s>{defaultPriceString}</s> <span className='text-danger' id='productCardSalePrices'>{salePriceString}</span></span>}
    </>
  )
}

export default PriceRanges;
