import express from 'express';
import * as docCtrl from '../controllers/documentController';
import { verifyToken } from '../middlewares/userAuth';

const router = express.Router();

router.route('/documents')
  .post(verifyToken, docCtrl.createDocument)
  .get(verifyToken, docCtrl.getDocuments);

router.route('/documents/private')
.get(verifyToken, docCtrl.viewPrivateDocuments);

router.route('/documents/public')
.get(verifyToken, docCtrl.getPublicDocument);

router.route('/users/:id/documents')
.get(verifyToken, docCtrl.getUsersDocument);

router.route('/search/documents')
.get(verifyToken, docCtrl.searchDocument);

router.route('/search/documents/user/:id')
.get(verifyToken, docCtrl.searchUserDocument);

router.route('/documents/:id/sharedocument')
.put(verifyToken, docCtrl.sharePrivateDocument);

router.route('/documents/:id')
  .get(verifyToken, docCtrl.getDocument)
  .put(verifyToken, docCtrl.editDocument)
  .delete(verifyToken, docCtrl.deleteDocument);


export default router;
