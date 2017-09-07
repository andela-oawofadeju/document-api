import model from '../models';


/**
 * Method to check the roleId in a request
 * Ensure it is equal to 2
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res object
 * Use parse int here and in other places
 */


export const checkRoleId = (req) => {
  console.log(req.body.roleId);
  return req.body.roleId !== 2;
}

export const userProfile = (user) => {
  console.log('hello');
  const profile = {
    id: user.id,
    username: user.username,
    name: user.name,
    email: user.email

  };
  return profile;
}

/**
 * Method to ensure a role cannot be
 * specified when a user is created
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res object
 */
export const ensureNoRole = (req) => {
  return req.body.roleId;
}

/**
 * Method to ensure the super admin can't
 * be deleted
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res object
 */
export const isSuperAdmin = (req, where) => {
  // if (where === 'params') {
  //   return req.params.id === '1';
  // }
  return (where === 'params') ? req.params.id === '1' : req.body.roleId === 1;
}

/**
 * Method to ensure the super admin can't
 * be deleted
 *
 * @param {Object} userId
 * @returns {String} - roleId of user
 */
export const getRoleIdFromUserId = (userId) => {
  model.User.findById(userId)
    .then((document) => {
      // return res.status(200).send(documents);
      // console.log('Role Id', documents.roleId);
      return document;
    });
}