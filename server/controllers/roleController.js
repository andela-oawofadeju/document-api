import db from '../models';

export const createRole = (req, res) => {
  db.Role.findOne({
    where: { title: req.body.title }
  })
    .then((roleExists) => {
      /**
       * If role already exists
       * return http status code 409
       */
      if (roleExists) {
        return res.status(409)
          .json({ message: `Role ${req.body.title} already exists` });
      }
      // create role
      db.Role.create(req.body)
        .then(newRole => res.status(201)
          .json({ message: 'New role has been assigned', newRole }));
    })
    .catch(error => res.status(500)
      .json({ error: error.errors, message: 'An error occurred' }));
};

export const getRole = (req, res) => {
  db.Role.findById(req.params.id)
    .then((role) => {
      res.status(200).json(role);
    })
    .catch(error => res.status(500).json(error));
};

export const getRoles = (req, res) => {
  db.Role.findAll()
    .then((roles) => {
      res.status(200).json(roles);
    })
    .catch(error => res.status(500).json(error));
};

export const updateRole = (req, res) => {
  if (req.params.id === '1') {
    return res.status(403)
      .json({ message: 'SuperAdmin role can not be updated' });
  }

  db.Role.findById(req.params.id)
    .then((foundRole) => {
      // check if role exists before updating
      if (!foundRole) {
        return res.status(404)
          .json({ message: `Update not successful due to unidentified role ${req.params.id}` });
      }
      return foundRole
        .update({ title: req.body.title })
        .then(role => res.status(200)
          .json({ message: 'Role updated successfully' }));
    });
};

export const deleteRole = (req, res) => {
  if (req.params.id === '1') {
    return res.status(403)
      .send({ message: 'SuperAdmin role can not be deleted' });
  }
  db.Role.findById(req.params.id)
    .then((foundRole) => {
      // check if role exists before deleting
      if (!foundRole) {
        return res.status(404)
          .json({ message: 'Unable to delete because role is not found' });
      }
      foundRole.destroy()
        .then(res.status(200)
          .json({ message: 'Role successfully deleted' }));
    });
};
