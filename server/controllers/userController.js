import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import page from '../helpers/page';
import { userProfile, checkRoleId, isSuperAdmin } from '../helpers/helpers';

dotenv.config({ silence: true });

const secret = process.env.SECRET;

export const createUser = (req, res) => {
  if (req.body.roleId === 1 || req.body.roleId === 2) {
    return res.status(403)
      .json({ message: 'You are not permitted to signup as an admin' });
  }
  db.User.findOne({ where: { email: req.body.email } })
    .then((userExist) => {
      if (userExist) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      db.User
        .create(req.body)
        .then((user) => {
          const token = jwt.sign({
            userId: user.id,
            userName: user.username,
            roleId: user.roleId
          },
            secret, {
              expiresIn: '1 day'
            });
          res.status(201).json({ token, payload: user.toPublicJson() });
        })
        .catch(error => res.status(400).json(error.errors));
    });
};

export const login = (req, res) => {
  db.User.find({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      if (!user.authenticate(req.body.password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({
        userId: user.id,
        userName: user.username,
        roleId: user.roleId
      },
          secret, {
            expiresIn: '1 day'
          });
      res.status(200).json({ token, payload: user.toPublicJson() });
    })
    .catch(error => res.status(500).json(error));
};


export const logout = (req, res) => {
  res.status(200).send({ message: 'Successfully logged out.' });
};


export const getUser = (req, res) => {
  db.User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user = userProfile(user);
    return res.status(200).json(user);
  });
};

export const findAllUsers = (req, res) => {
  const query = page.pagination(req);
  const limit = query.limit;
  const offset = query.offset;
  const order = query.order;
  db.User.findAndCountAll(query)
      .then((users) => {
        if (!users) {
          return res.status(404)
            .send({ message: 'No user found' });
        }
        const meta = {};
        meta.totalCount = users.count;
        meta.pageSize = users.rows.length;
        meta.pageCount = Math.floor(meta.totalCount / limit) + 1;
        meta.currentPage = Math.floor(offset / limit) + 1;
        res.status(200).send({ paginationMeta: meta, result: users.rows });
      })
  .catch(err => res.status(400).json(err));
};

export const searchUser = (req, res) => {
  db.User.findAll({
    where: {
      $or: [{
        username: {
          $iLike: `%${req.query.q}%`
        }
      }, {
        firstname: {
          $iLike: `%${req.query.q}%`
        }
      }, {
        lastname: {
          $iLike: `%${req.query.q}%`
        }
      }, {
        email: {
          $iLike: `%${req.query.q}%`
        }
      }]
    }
  })
    .then(documents => res.status(200)
      .json(documents))
    .catch(error => res.status(400)
      .json(error));
};

export const updateUser = (req, res) => {
  const body = req.body;
  db.User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404).json({
        message: `User with id ${req.params.id} not found!`
      });
    }
    user.update({
      username: body.username || user.username,
      firstname: body.firstname || user.firstname,
      lastname: body.lastname || user.lastname,
      email: body.email || user.email,
      password: body.password || user.password,
      roleId: body.roleId || user.roleId
    })
    .then(() => res.status(200).json({ message: `User with id ${req.params.id} updated!` }))
    .catch(err => res.status(400).json(err.errors));
  });
};


export const updateUserRole = (req, res) => {
  if (isSuperAdmin(req, 'body', res)) {
    return res.status(403)
      .json({ message: 'SuperAdmin Role cannot be updated' });
  }
  // first check roles table to ensure roleId in body exists
  db.Role.findById(req.body.roleId)
    .then((foundRole) => {
      // check if role exists
      if (!foundRole) {
        return res.status(404)
          .json({ message: 'Role not found, update unsucessful' });
      }
      // If role is found check for user and update accordingly
      db.User.findById(req.params.id)
        .then((foundUser) => {
          if (!foundUser) {
            return res.status(404)
              .json({ message: 'User not found' });
          } else if (foundUser.roleId === req.body.roleId) {
            return res.status(400)
              .json({ message: 'Duplicated roles' });
          }
          return foundUser
            .update({
              roleId: req.body.roleId
            }).then(res.status(201)
              .json({ message: 'User role successfully updated' }));
        });
    });
};

export const deleteUser = (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(res.status(200).json({ message: `User with id ${req.params.id} deleted` }))
    .catch(error => res.status(400).json(error));
};
