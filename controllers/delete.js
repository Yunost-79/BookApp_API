import Book from '../models/book.js';
import mongoose from 'mongoose';

const deleteBook = async ({ params: { id: bookId } }, res) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: `Invalid book ID: ${bookId}` });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: `Book with ID:${bookId} was not found ` });
    }

    await Book.findByIdAndDelete(bookId);
    return res.json({ message: `Book with ID:${bookId} has been deleted ` });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export default deleteBook;
