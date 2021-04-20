import React from 'react';
import { findDefaultPriceRange, findSalePriceRange } from '../../utilityFunctions/priceRanges';
import { addDecimals } from '../../utilityFunctions/addDecimals';
import './PriceRanges.css';

const PriceRanges = ({ product }) => {
  let defaultPriceRange;
  let salePriceRange;
  defaultPriceRange = findDefaultPriceRange(product.sizes);
  salePriceRange = findSalePriceRange(product.sizes);
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
      salePriceRange.length === 1 ? <span><del>{defaultPriceString}</del> <span className='text-danger productCardSalePrices'>{salePriceString}</span></span> : 
      <span><del>{defaultPriceString}</del> <span className='text-danger productCardSalePrices'>{salePriceString}</span></span>}
    </>
  )
}

export default PriceRanges;
