import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants';
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from '../constants/userConstants';

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