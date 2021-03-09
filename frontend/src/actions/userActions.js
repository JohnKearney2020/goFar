import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from "../constants/userConstants"

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