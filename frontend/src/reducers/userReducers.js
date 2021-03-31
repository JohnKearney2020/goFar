import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_LOGOUT } from '../constants/userConstants';
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { WISHLIST_PRODUCT_DETAILS_REQUEST, WISHLIST_PRODUCT_DETAILS_SUCCESS, WISHLIST_PRODUCT_DETAILS_FAIL, WISHLIST_PRODUCT_DETAILS_RESET} from '../constants/userConstants';


// See if there is userInfo stored in local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// console.log('userInfoFromStorage')
// console.log(userInfoFromStorage)
//If so, set the initial state for userLoginReducer to that, otherwise use the default state
const initialState = (userInfoFromStorage || { userInfo: {cart: [], wishList: [] } });
// console.log('initialState:')
// console.log(initialState);

// export const userLoginReducer = (state = {}, action) => {
// export const userLoginReducer = (state = { userInfo: { wishList: [], cart: [] }}, action) => {
// export const userLoginReducer = (state = { test1: 'test' }, action) => {
export const userLoginReducer = (state = { userInfo: initialState }, action) => {
  switch(action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
      // return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { userInfo: {cart: [], wishList: [] } }
    default: 
      return state;
  } 
}

export const userRegisterReducer = (state = { }, action) => {
  switch(action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: 
      return state;
  } 
}

const userDetailsPlaceHolderObj = {
  addresses: []
}

export const userDetailsReducer = (state = { user: userDetailsPlaceHolderObj }, action) => {
  switch(action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_LOGOUT:
      return { user: userDetailsPlaceHolderObj };
    default: 
      return state;
  } 
}

export const userUpdateProfileReducer = ( state = { }, action ) => {
  switch(action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return { };
    default: 
      return state;
  } 
}

export const wishListDetailsReducer = ( state = { wishListProducts: [] }, action ) => {
  switch(action.type) {
    case WISHLIST_PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case WISHLIST_PRODUCT_DETAILS_SUCCESS:
      return { loading: false, success: true, wishListProducts: action.payload };
    case WISHLIST_PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case WISHLIST_PRODUCT_DETAILS_RESET:
      return { };
    default: 
      return state;
  } 
}







// import { WISHLIST_PRODUCT_DETAILS_REQUEST, WISHLIST_PRODUCT_DETAILS_SUCCESS, WISHLIST_PRODUCT_DETAILS_FAIL, WISHLIST_PRODUCT_DETAILS_RESET} from '../constants/userConstants';


