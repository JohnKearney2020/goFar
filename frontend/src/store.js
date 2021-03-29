import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer
});

//See if user info has been stored in local storage
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
// const initialState = userInfoFromStorage ? userInfoFromStorage : { userInfo: { wishList: [] }};
let initialState = {};
if(userInfoFromStorage !== null){
  console.log('useInfoFromStorage:')
  console.log(userInfoFromStorage);
  initialState = {userLogin: { userInfo: userInfoFromStorage }};
} else {
  initialState = { 
    userLogin: {
      userInfo: {
        wishList: [],
        cart: []
      }
    }
  };
}
// const initialState = userInfoFromStorage ? userInfoFromStorage : { userLogin: { wishList: [] } };
// console.log('initial state:')
// console.log(initialState)

// const initialState = {
//   userLogin: { userInfo: {userInfoFromStorage} }
// };
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
