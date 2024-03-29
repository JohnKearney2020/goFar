import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, wishListDetailsReducer } from './reducers/userReducers';
import { cartDetailsReducer, cartQtyMessageReducer, cartMovedMessageReducer, cartLoadingReducer } from './reducers/cartReducers';
import { checkoutDataReducer, orderLoadingReducer } from './reducers/checkoutReducers';
import { mapReducer } from './reducers/mapReducers';
import { userOrderListReducer } from './reducers/orderReducers';
import { reviewListReducer, addReviewReducer } from './reducers/reviewReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  wishListProductDetails: wishListDetailsReducer,
  cartProductDetails: cartDetailsReducer,
  cartLoading: cartLoadingReducer,
  cartQtyChanges: cartQtyMessageReducer,
  cartMovedChanges: cartMovedMessageReducer,
  checkoutData: checkoutDataReducer,
  orderLoading: orderLoadingReducer,
  mapLoadedScript: mapReducer,
  userOrders: userOrderListReducer,
  productReviews: reviewListReducer,
  addReview: addReviewReducer
});

//See if user info has been stored in local storage
// const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// const initialState = userInfoFromStorage ? userInfoFromStorage : { userInfo: { wishList: [] }};
// let initialState = {};
// if(userInfoFromStorage !== null){
//   console.log('useInfoFromStorage:')
//   console.log(userInfoFromStorage);
//   initialState = {userLogin: { userInfo: userInfoFromStorage }};
// } else {
//   initialState = { 
//     userLogin: {
//       userInfo: {
//         wishList: [],
//         cart: []
//       }
//     }
//   };
// }

const middleware = [thunk];
// const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
