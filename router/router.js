import express from "express";

import postBook from "../controllers/create.js";
import getBooks from "../controllers/get.js";
import deleteBook from "../controllers/delete.js";
import updateBook from "../controllers/put.js";

const configureRoutes = () => {
  const router = express.Router();

  router.post("/book", postBook);
  router.get("/books/:id?", getBooks);
  router.delete("/book/:id", deleteBook);
  router.put("/book/:id", updateBook);

  return router;
};

export default configureRoutes;
