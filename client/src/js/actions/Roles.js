/**
 * loadRoleSuccess action
 * @param  {object} roles [description]
 * @return {object}      [description]
 */
import RoleApi from '../utils/RolesApi';
import * as types from './Types';

class Actions {
  static getAllRoles(roles) {
    return { type: types.GET_ALL_ROLES, roles };
  }

  static getRole(role) {
    return { type: types.GET_ROLE, role };
  }

  static createRole(role) {
    return { type: 'CREATE_ROLE', role };
  }

  static showRole(role) {
    return { type: types.SHOW_ROLE, role };
  }

  static updateRole(id) {
    return { type: 'UPDATE_ROLE', id };
  }

  static deleteRole(id) {
    return { type: 'DELETE_ROLE', id };
  }

  static roleError(error) {
    return { type: 'ROLE_ERROR', error };
  }

  static roleSuccess(payload) {
    return { type: 'ROLE_SUCCESS', payload };
  }
}


/**
 * load roles
 * @return {object} object of roles
 */

export const loadRoles = () => (dispatch) => {
  RoleApi.getAll()
    .then((roles) => {
      dispatch(Actions.getAllRoles(roles));
    })
    .catch((error) => {
      throw (error);
    });
};

/**
 * get existing role
 * GET /roles/
 * @param  {object} role role object to be svaed
 * @return {object}      response from api
 */

export const getRole = id => (dispatch) => {
  RoleApi.get(id)
  .then((role) => {
    dispatch(Actions.getRole(role));
  })
  .catch((error) => {
    dispatch(Actions.roleError(error));
  });
};

/**
 * create new role
 * POST /roles/
 * @param  {object} role role object to be svaed
 * @return {object}      response from api
 */

export const createRole = data => (dispatch) => {
  RoleApi.create(data)
    .then((res) => {
      dispatch(Actions.createRole(res.newRole));
    })
    .catch(error => dispatch(error));
};

/**
 * delete from state the current selected role
 * @return {[type]} [description]
 */

export const deleteRole = id => (dispatch) => {
  RoleApi.delete(id)
     .then((res) => {
       dispatch(Actions.deleteRole(res));
     })
    .catch(error => dispatch(error));
};

/**
 * update role
 * PUT /roles/:id
 * @param  {object} role role object to be updated
 * @return {object}      response from api
 */

export const updateRole = id => (dispatch) => {
  RoleApi.update(id)
     .then((res) => {
       dispatch(Actions.updateRole(res));
     })
    .catch(error => dispatch(error));
};
