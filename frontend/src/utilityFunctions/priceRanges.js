import { sortLowToHigh } from '../utilityFunctions/sortingFunctions';
import { addDecimals } from '../utilityFunctions/addDecimals';

// product.sizes.sizeCategories
export const findDefaultPriceRange = (arrayOfPrices) => {
  let prices = [];
  for(let eachSizeCategory of arrayOfPrices){
    prices.push(addDecimals(eachSizeCategory.sizeCategoryDefaultPrice));
  }
  prices.sort(sortLowToHigh);
  // If all the items have the same base price
  if(prices[0] === prices[prices.length - 1]){
    return [prices[0]]; //Needs to be sent back as an array of length 1
  } else {
    return prices;
  }
}
// product.sizes.sizeCategories.sizeCategoryColorsAndSizes
export const findSalePriceRange = (arrayOfPrices) => {
  let prices = [];
  for(let eachSizeCategoryName of arrayOfPrices){
    for(let eachColor of eachSizeCategoryName.sizeCategoryColorsAndSizes){
      if(eachColor.colorSalePrice !== 0) prices.push(addDecimals(eachColor.colorSalePrice));
    }
  }
  prices.sort(sortLowToHigh);
  // If all the items are on sale for the exact same sale price
  if(prices[0] === prices[prices.length - 1]){
    return [prices[0]]; //Needs to be sent back as an array of length 1
  } else {
    return prices;
  }
}