import UserApi from '../utils/UsersApi';
import * as types from './Types';


class Actions {
  static getAllUsers(users) {
    return { type: types.GET_ALL_USERS, users };
  }

  static getUser(user) {
    return { type: types.GET_USER, user };
  }

  static createUser(user) {
    return { type: 'CREATE_USER', user };
  }

  static showUser(user) {
    return { type: types.SHOW_USER, user };
  }

  static updateUser(id) {
    return { type: 'UPDATE_ALL_USERS', id };
  }

  static deleteUser(id) {
    return { type: 'DELETE_ALL_USERS', id };
  }

  static userError(error) {
    return { type: 'USER_ERROR', error };
  }

  static userSuccess(payload) {
    return { type: 'USER_SUCCESS', payload };
  }
}

/**
 * loadUserSuccess,
 * action dispatched on getting a user records from db
 * @param  {object} users user response fron api call in the thunk
 * @return {object}      reponse dispatched to reducer
 */

export const loadUsers = () => (dispatch) => {
  UserApi.getAll()
    .then((users) => {
      console.log(users);
      dispatch(Actions.getAllUsers(users.data.result));
    })
    .catch((error) => {
      throw (error);
    });
};


export const getUser = id => (dispatch) => {
  UserApi.get(id)
  .then((user) => {
    dispatch(Actions.getUser(user.data));
  })
  .catch((error) => {
    dispatch(Actions.userError(error));
  });
};

/**
 * action dispatched on creating new user success
 *
 * @export
 * @param {any} user
 * @returns {Object} json object
 */

export const createUser = data => (dispatch) => {
  UserApi.create(data)
    .then((res) => {
      dispatch(Actions.userSuccess(res));
    })
    .catch(error => dispatch(error));
};


export const deleteUser = id => (dispatch) => {
  UserApi.delete(id)
     .then((res) => {
       dispatch(Actions.userSuccess(res));
     })
    .catch(error => dispatch(error));
};

export const updateUser = id => (dispatch) => {
  UserApi.update(id)
     .then((res) => {
       dispatch(Actions.userSuccess(res));
     })
    .catch(error => dispatch(error));
};
