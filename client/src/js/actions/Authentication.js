import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UN_AUTH_USER,
  AUTH_ERROR,

 } from './Types';
import axios from '../utils/index';
import { setToken, removeToken } from '../utils/helpers';

/**
 *  login users action dispatch on success authentication
 *
 * @export
 * @param {any} token
 * @returns {Object} json object
 */


export const signInUser = ({ LoginEmail, LoginPassword }) => (dispatch) => {
  axios.post('/users/login', { email: LoginEmail, password: LoginPassword })
    .then((res) => {
      setToken(res.data.token, res.data.payload);

      dispatch({ type: AUTH_USER });

      browserHistory.push('/dashboard');
    })
    .catch((err) => {
      dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
    });
};

/**
 *
 * logout user and clear token from localStorage
 * @export
 * @returns {any} data
 */

export const logoutUser = () => (dispatch) => {
  axios.post('/users/logout')
    .then(() => {
      removeToken();
      browserHistory.push('/');
      dispatch({ type: UN_AUTH_USER });
    });
};

/**
 * action dispatched on register new user success
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */

export const registerUser =
  ({ firstname, lastname, username, email, password }) => (dispatch) => {
    axios.post('/users', { firstname, lastname, username, email, password })
    .then((res) => {
      setToken(res.data.token, res.data.payload);

      dispatch({ type: AUTH_USER });

      browserHistory.push('/dashboard');
    })
    .catch((err) => {
      // dispatch({ type: AUTH_ERROR, payload: err.response.data.message });
    });
  };

export const authenticate = () => (dispatch) => {
  dispatch({ type: AUTH_USER });
};
