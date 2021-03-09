import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants';
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_RESET } from '../constants/productConstants';


export const productListReducer = (state = { products: [] }, action) => {
  switch(action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: 
      return state;
  } 
}

const productPlaceHolderObj = {
    reviews: [],
    colors: [],
    sizes: [],
    featureIcons: [],
    descriptions: [],
    features: [],
    care: [],
    materials: []
}

export const productDetailsReducer = (state = { product: productPlaceHolderObj }, action) => {
  switch(action.type) {
    case PRODUCT_DETAILS_REQUEST:
      // return { loading: true, loaded: false, ...state };
      // return { loading: true, loaded: false, product: [] };
      return { loading: true, loaded: false, product: productPlaceHolderObj };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, loaded: true, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { product: productPlaceHolderObj };
    default: 
      return state;
  } 
}