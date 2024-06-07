import express from 'express';

import postBook from '../controllers/create.ts';
import getBooks from '../controllers/get.ts';
import deleteBook from '../controllers/delete.ts';
import updateBook from '../controllers/put.ts';

const configureRoutes = () => {
  const router = express.Router();

  router.post('/book', postBook);
  router.get('/books/:id?', getBooks);
  router.delete('/book/:id', deleteBook);
  router.put('/book/:id', updateBook);

  return router;
};

export default configureRoutes;
