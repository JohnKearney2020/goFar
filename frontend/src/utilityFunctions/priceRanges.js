import { sortLowToHigh } from '../utilityFunctions/sortingFunctions';

// product.sizes.sizeCategories
export const findDefaultPriceRange = (arrayOfPrices) => {
  let prices = [];
  for(let eachSizeCategory of arrayOfPrices){
    prices.push(eachSizeCategory.sizeCategoryDefaultPrice);
  }
  prices.sort(sortLowToHigh);
  return prices;
}
// product.sizes.sizeCategories.sizeCategoryColorsAndSizes
export const findSalePriceRange = (arrayOfPrices) => {
  let prices = [];
  for(let eachSizeCategoryName of arrayOfPrices){
    for(let eachColor of eachSizeCategoryName.sizeCategoryColorsAndSizes){
      if(eachColor.colorSalePrice !== 0) prices.push(eachColor.colorSalePrice);
    }
  }
  prices.sort(sortLowToHigh);
  return prices;
}