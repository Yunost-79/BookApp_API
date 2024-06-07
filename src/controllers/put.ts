import mongoose from 'mongoose';
import Book from '../models/book.ts';
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUNDS_CODE, OK_CODE } from '../variables/statusCodes.ts';

const updateBook = async (
  req: {
    params: { id: string };
    body: {
      title: String;
      pageCount: Number;
      publishedDate: { data: String };
      thumbnailUrl: String;
      shortDescription: String;
      longDescription: String;
      status: String;
      authors: String;
    };
  },
  res: Response | any
) => {
  const { id: bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(BAD_REQUEST_CODE).json({ message: `Invalid bool ID: ${bookId}` });
  }

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(NOT_FOUNDS_CODE).json({ message: `Book with ID:${bookId} was not found ` });
    }

    const updateBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true, // return the updated book
    });
    return res.status(OK_CODE).json(updateBook);
  } catch (e: unknown) {
    const err = e as Error;
    res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: err.message });
  }
};

export default updateBook;
