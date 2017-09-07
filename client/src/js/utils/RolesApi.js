import axios from './index';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */

export default class RolesApi {

  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('/roles')
      .then(roles => resolve(roles.data))
      .catch(error => reject(error));
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      axios.get(`/roles/${id}`)
      .then((roles) => {
        return resolve(roles);
      })
      .catch(error => reject(error));
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      axios.post('/roles', data)
     .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }


  static delete(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`/roles/${id}`)
     .then(roles => resolve(roles))
      .catch(error => reject(error));
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      axios.update(`/roles/${id}`, data)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
}
