import Book from '../models/book.js';
import mongoose from 'mongoose';

const getBooks = async ({ params: { id: bookId } }, res) => {
  try {
    if (bookId && !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: `Invalid book ID: ${bookId}` });
    }

    if (bookId) {
      // If an ID is provided, get the book with this ID
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: `Book with ID:${bookId} was not found ` });
      }

      return res.json(book);
    } else {
      // If no ID is provided, get all books
      const books = await Book.find();
      return res.json(books);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default getBooks;
