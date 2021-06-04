import axios from 'axios';
import { toast } from 'react-toastify';

import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_LOGOUT } from '../constants/userConstants';
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from '../constants/userConstants';
import { WISHLIST_PRODUCT_DETAILS_REQUEST, WISHLIST_PRODUCT_DETAILS_SUCCESS, WISHLIST_PRODUCT_DETAILS_FAIL, WISHLIST_PRODUCT_DETAILS_RESET} from '../constants/userConstants';
import { CART_QTY_MESSAGE_RESET, CART_MOVED_MESSAGE_RESET, CART_PRODUCT_DETAILS_RESET } from '../constants/cartConstants';
import { USER_ORDER_LIST_RESET } from '../constants/orderConstants';


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });
    // set headers to json
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    // attemp to log in. Verify user email and password
    const { data } = await axios.post('/api/users/login', { email, password }, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    // store user info in local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
    toast.info('Log in Successful!', { position: "bottom-center", autoClose: 4000 }
  );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const logout = () => (dispatch) => {
  console.log('in logout action');
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_LOGOUT });
  dispatch({ type: WISHLIST_PRODUCT_DETAILS_RESET });
  dispatch({ type: CART_QTY_MESSAGE_RESET });
  dispatch({ type: CART_MOVED_MESSAGE_RESET });
  dispatch({ type: CART_PRODUCT_DETAILS_RESET });
  dispatch({ type: USER_ORDER_LIST_RESET });
  toast.info('Log Out Successful!', { position: 'bottom-center', autoClose: 3500 });
}

export const register = (name, email, password ) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });
    // set headers to json
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    // attempt to register
    const { data } = await axios.post('/api/users', { name, email, password }, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
    })
    toast.success('User Registered Successfully!', 
      { 
        // position: "bottom-center",
        position: "top-right",
        autoClose: 3500,
      }
    );
    //automatically log the user in after a successful registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })
    // store user info in local storage
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// The get state parameter is needed b/c we will need a JWT from the state for this
export const getUserDetails = (id) => async (dispatch, getState) => {
  // This action pulls double duty. id can be an actual user id, or we can pass it 'profile'
  // if an actualy id it will be used to get user data based on their id. For example, when the admin is looking at lists of users
  // when we pass profile, it will be when a user is looking at their own profile data.
  // see the route for 'router.route('/profile')' and its corresponing 'updateUserProfile' function in userControllers.js. If we pass 'profile', it
  // will hit the /profile route. If we pass an id, it will hit the /id route
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    });

    const { userLogin: { userInfo } } = getState();
    // set headers to json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` //this goes to the 'api/users/profile' route which is a protected route. Our middleware is expecting
        //a token
      }
    }
    // attempt to get user details
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// The get state parameter is needed b/c we will need a JWT from the state for this
export const updateUserProfile = (user, userUpdateType) => async (dispatch, getState) => {
  console.log(`userUpdateType: ${userUpdateType}`);
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    const { userLogin: { userInfo } } = getState();
    // set headers to json
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` //this goes to the 'api/users/profile' route which is a protected route. Our middleware is expecting a token
      }
    }
    // attempt to update user details
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })
    //Handle Success Cases
    let successMessage = '';
    // let notificationType = '';
    let position = '';
    switch (userUpdateType) {
      case 'newAddress':
        successMessage = 'New Address Added!';
        // notificationType = 'success';
        position = 'bottom-center';
        // position = '';
        break;
      case 'deleteAddress':
        successMessage = 'Address Deleted!';
        // notificationType = 'success';
        // position = 'bottom-center';
        position = 'top-center';
        break;
      case 'updateAddress':
        successMessage = 'Address Updated!';
        // notificationType = 'success';
        // position = 'bottom-center';
        position = 'top-center';
        break;
      case 'makePrimary':
        successMessage = 'New Primary Address Set!';
        // notificationType = 'success';
        // position = 'bottom-center';
        position = 'top-center';
        break;
      case 'userUpdate':
        successMessage = 'User Profile Information Updated!';
        // notificationType = 'success';
        // position = 'bottom-center';
        position = 'top-center';
        break;
    
      default:
        break;
    }
    console.log(`position: ${position}`)
    toast.success(successMessage, 
      { 
        position: position,
        autoClose: 3500,
      }
    );
    //If we update the user profile successfully, we want to dispatch the USER_LOGIN_SUCCESS action again, but if we simply pass
    // 'payload: data' it will populate userInfo with some sensitive information like addresses and phone number that we don't
    // want to be stored in local storage, so we can't just send it 'payload: data'
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
      cart: data.cart,
      wishList: data.wishList,
      loggedIn: data.loggedIn,
      token: data.token
    }
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: userData
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

// The get state parameter is needed b/c we will need a JWT from the state for this
export const getWishListProductDetails = (arrayOfProductIDs) => async (dispatch, getState) => {
  // console.log('in wishlistproductdetails userAction, arrayOfProductIDs:')
  try {
    dispatch({
      type: WISHLIST_PRODUCT_DETAILS_REQUEST
    });

    const { userLogin: { userInfo } } = getState();

    const config = { // set headers to json
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}` //this goes to the 'api/users/profile' route which is a protected route. Our middleware is expecting a token
      }
    }
    // attempt to get wishlist product details
    const { data } = await axios.post(`/api/users/wishlist`, arrayOfProductIDs, config );
    dispatch({
      type: WISHLIST_PRODUCT_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: WISHLIST_PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
