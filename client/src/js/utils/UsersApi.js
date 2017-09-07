import axios from './index';

/**
 *
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */

export default class UsersApi {

  static getAll() {
    return new Promise((resolve, reject) => {
      axios.get('/users')
        .then(users => resolve(users))
        .catch(error => reject(error));
    });
  }

  static get(id) {
    return new Promise((resolve, reject) => {
      axios.get(`/users/${id}`)
        .then(users => resolve(users))
        .catch(error => reject(error));
    });
  }

  static create(data) {
    return new Promise((resolve, reject) => {
      axios.post('/users', data)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`/users/${id}`)
      .then(users => resolve(users))
      .catch(error => reject(error));
    });
  }

  static update(id, data) {
    return new Promise((resolve, reject) => {
      axios.update(`/users/${id}`, data)
      .then(res => resolve(res.data))
      .catch(error => reject(error));
    });
  }
}
