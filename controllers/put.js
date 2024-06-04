import Book from '../models/book.js';
import mongoose from 'mongoose';
const updateBook = async (req, res) => {
  const { id: bookId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: `Invalid book ID: ${bookId}` });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: `Book with ID:${bookId} was not found ` });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true, // return the updated book
    });
    return res.json(updatedBook);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
export default updateBook;
