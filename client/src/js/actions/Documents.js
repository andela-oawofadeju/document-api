/**
 * Documents action, disptach action and
 * action types of each action to the reducer
 */

import DocumentApi from '../utils/DocumentsApi';
import * as types from './Types';

import { getPayload } from '../utils/helpers';

class Actions {
  static getAllDocuments(documents) {
    return { type: types.GET_ALL_DOCUMENTS, documents };
  }

  static getDocument(doc) {
    return { type: types.GET_DOCUMENT, doc };
  }

  static createDocument(document) {
    return { type: 'CREATE_DOCUMENT', document };
  }

  static showDocument(doc) {
    return { type: types.SHOW_DOCUMENT, doc };
  }

  static updateDocument(updatedDocument) {
    return { type: types.UPDATE_DOCUMENT, updatedDocument };
  }

  static deleteDocument(id) {
    return { type: types.DELETE_DOCUMENT, id };
  }

  static documentError(error) {
    return { type: 'DOCUMENT_ERROR', error };
  }

  static documentSuccess(payload) {
    return { type: 'DOCUMENT_SUCCESS', payload };
  }
}

/**
 *
 * loaddocumentsuccess
 * @export
 * @param {any} documents  returned documents from api call
 * @returns {any} action and action types
 */

export const loadDocuments = () => (dispatch) => {
  const { id } = getPayload();
  DocumentApi.getAll(id)
    .then((documents) => {
      dispatch(Actions.getAllDocuments(documents.rows));
    })
    .catch((error) => { throw (error); });
};


/**
 * get documentsfrom database
 * by calling api route /documents/:id
 *
 * @export
 * @returns {object} documents
 */

export const getDocument = id => (dispatch) => {
  DocumentApi.get(id)
  .then((doc) => {
    dispatch(Actions.getDocument(doc));
  })
  .catch((error) => {
    dispatch(Actions.documentError(error));
  });
};

/**
 * create new document success action
 *
 * @export
 * @param {any} document newly create document reponse from api post
 * @returns {any} action and action types
 */

export const createDocument = data => (dispatch) => {
  DocumentApi.create(data)
    .then((res) => {
      dispatch(Actions.documentSuccess(res));
    })
    .catch(error => dispatch(error));
};

/**
 * delete from state the currently selected document
 * @return {[type]} [description]
 */

export const deleteDocument = id => (dispatch) => {
  DocumentApi.delete(id)
    .then(() => {
      dispatch(Actions.deleteDocument(id));
    })
  .catch(error => dispatch(error));
};

/**
 * update documents to database using PUT api route /documents/:id
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */

export const updateDocument = updateData => (dispatch) => {
  DocumentApi.update(updateData)
    .then((res) => {
      dispatch(Actions.updateDocument(res.updatedDocument));
    })
  .catch(error => dispatch(error));
};

/**
 * search documents from database using GET api route /documents/:id
 *
 * @export
 * @param {any} document
 * @returns {object} documents
 */

export const searchDocument = (id, query) => (dispatch) => {
  DocumentApi.search(id, query)
  .then((res) => {
    dispatch(Actions.getAllDocuments(res.rows));
  })
  .catch(error => dispatch(error));
};


export const getPrivateDocuments = id => (dispatch) => {
  DocumentApi.getPrivate(id)
  .then((res) => {
    dispatch(Actions.getAllDocuments(res.rows));
  })
  .catch(error => dispatch(error));
};

export const getPublicDocuments = id => (dispatch) =>{
  DocumentApi.getPublic(id)
  .then((res) => {
    dispatch(Actions.getAllDocuments(res));
  })
  .catch(error => dispatch(error));
};
