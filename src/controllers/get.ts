import mongoose from 'mongoose';
import Book from '../models/book.ts';
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUNDS_CODE } from '../variables/statusCodes.ts';

const getBooks = async ({ params: { id: bookId } }: { params: { id: string } }, res: Response | any) => {
  try {
    if (bookId && !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(BAD_REQUEST_CODE).json({ message: `Invalid bool ID: ${bookId}` });
    }

    if (bookId) {
      // If an ID is provided, get the book with this ID
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(NOT_FOUNDS_CODE).json({ message: `Book with ID: ${bookId} was not found` });
      }
      return res.json(book);
    } else {
      // If no ID is provided, get all books
      const books = await Book.find();
      return res.json(books);
    }
  } catch (e: unknown) {
    const err = e as Error;
    res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: err.message });
  }
};

export default getBooks;
