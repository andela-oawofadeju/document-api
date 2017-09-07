import db from '../models';
import getUserDocumentQuery from '../helpers/query';
import page from '../helpers/page';

export const createDocument = (req, res) => {
  const newDoc = {
    title: req.body.title,
    content: req.body.content,
    access: req.body.access,
    ownerId: req.decoded.userId,
    ownerRoleId: req.decoded.roleId
  };
  db.Document.findOne({ where:
  {
    title: newDoc.title
  }
  })
.then((docExist) => {
  if (docExist) {
    return res.status(409)
    .json({ message: `title: ${newDoc.title} already exist` });
  }
  db.Document.create(newDoc)
    .then(document => res.status(201).json(document))
    .catch(error => res.status(400).json(error));
});
};

export const getDocument = (req, res) => {
  db.Document.findById(req.params.id)
    .then((foundDoc) => {
      if (!foundDoc) {
        return res.status(404)
          .json({ message: `Document with id ${req.params.id} not found` });
      } else if (foundDoc.access === 'private' && foundDoc.ownerId === req.decoded.userId) {
        return res.status(200)
          .json(foundDoc);
      }
      res.status(200)
        .json(foundDoc);
    });
};

export const countUsersDoc = (req) => {
  let rawQuery =
      `SELECT COUNT (*) FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE ("Users"."roleId" = ${req.decoded.roleId} AND "Documents"."access" = 'role') OR ("Documents"."ownerId" = ${req.params.id})`;
  if (req.query.q) {
    rawQuery =
      `SELECT COUNT (*) FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE (("Users"."roleId" = ${req.decoded.roleId} AND "Documents"."access" = 'role') OR ("Documents"."ownerId" = ${req.params.id})) AND (( "Documents"."title" ILIKE '%${req.query.q}%' ) OR ( "Documents"."content" ILIKE '%${req.query.q}%'))`;
  }
  return db.sequelize.query(rawQuery, {
    type: db.sequelize.QueryTypes.SELECT
  });
};


export const getUsersDocument = (req, res) => {
  db.sequelize.query(getUserDocumentQuery(req), {
    type: db.sequelize.QueryTypes.SELECT
  })
      .then((docs) => {
        if (!docs.length) {
          return res.status(404)
            .send({ message: 'No document found' });
        }
        const query = page.pagination(req);
        countUsersDoc(req)
          .then((count) => {
            const meta = {};
            meta.totalCount = count[0].count;
            meta.pageSize = query.limit;
            meta.pageCount = Math.floor(meta.totalCount / query.limit) + 1;
            meta.currentPage = Math.floor(query.offset / query.limit) + 1;
            res.status(200).send({ paginationMeta: meta, rows: docs });
          });
      });
};

export const getPublicDocument = (req, res) => {
  const rawQuery =
    `SELECT * FROM "Documents" INNER JOIN "Users" ON "Documents"."ownerId" = "Users"."id" WHERE ("Users"."roleId" = ${req.decoded.roleId} AND "Documents".access = 'role') OR ("Documents".access = 'public')`;
  db.sequelize.query(rawQuery, {
    type: db.sequelize.QueryTypes.SELECT
  })
      .then((document) => {
        if (!document) {
          return res.status(404)
            .json({ message: 'No document found' });
        }
        res.status(200).json(document);
      });
};


export const getDocuments = (req, res) => {
  db.Document.findAndCount({
    where: { $or: [
       { access: 'public' },
      { $and: [
        { access: 'private' },
        { ownerId: req.decoded.userId }
      ] }
    ] }
  })
    .then(document => res.status(200).json(document))
    .catch(err => res.status(400).json(err));
};

export const searchDocument = (req, res) => {
  db.Document.findAll({
    where: {
      access: 'public',
      $or: [{
        title: {
          $iLike: `%${req.query.q}%`
        }
      }]
    }
  })
    .then(document => res.status(200)
      .json(document))
.catch(err => res.status(400).json(err));
};

export const searchUserDocument = (req, res) => {
  db.Document.findAll({
    where: {
      ownerId: req.params.id,
      $or: [{
        content: {
          $iLike: `%${req.query.q}%`
        }
      }, {
        title: {
          $iLike: `%${req.query.q}%`
        }
      }]
    }
  })
    .then(document => res.status(200)
      .json(document))
.catch(err => res.status(400).json(err));
};

export const sharePrivateDocument = (req, res) => {
  const docId = req.params.id;
  const shareUserEmail = req.body.shareUserEmail;
  db.User.findOne({ where: { email: shareUserEmail } })
    .then((foundShareUser) => {
      db.Document.findById(docId)
        .then((foundDocument) => {
          const list = foundDocument.shareId;
          list.push(foundShareUser.id);
          foundDocument.update({ shareId: list })
            .then((shareDoc) => {
              res.status(200).json(shareDoc);
            });
        });
    });
};

export const viewPrivateDocuments = (req, res) => {
  const userId = req.decoded.userId;
  db.Document.findAndCount({
    where: {
      $and: [
          { access: 'private' },
          { ownerId: userId }
      ]
    }
  })
    .then(privateDoc => res.status(200).json(privateDoc));
};


export const editDocument = (req, res) => {
  db.Document.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404)
          .json({ message: `documentid: ${req.params.id} does not exist` });
      }
      document.update(req.body)
        .then((updatedDocument) => {
          res.status(200).json({ message: 'Update successful', updatedDocument });
        });
    });
};


export const deleteDocument = (req, res) => {
  db.Document.findById(req.params.id)
    .then((document) => {
      if (!document) {
        return res.status(404)
          .json({ message: `id ${req.body.id} does not exist` });
      }
      document.destroy();
      res.status(200).json({ message: 'Delete successful' });
    });
};
