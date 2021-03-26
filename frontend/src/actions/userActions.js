import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';
import { USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_LOGOUT } from '../constants/userConstants';
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from '../constants/userConstants';

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
export const updateUserProfile = (user) => async (dispatch, getState) => {
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
    // attempt to get user details
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}
