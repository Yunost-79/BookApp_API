import mongoose from 'mongoose';
import Book from '../models/book.ts';
import { BAD_REQUEST_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUNDS_CODE, OK_CODE } from '../variables/statusCodes.ts';

const deleteBook = async ({ params: { id: bookId } }: { params: { id: string } }, res: Response | any) => {
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(BAD_REQUEST_CODE).json({ message: `Invalid bool ID: ${bookId}` });
  }

  try {
    const book = await Book.findById(bookId);
    if(!book){
        return res.status(NOT_FOUNDS_CODE).json({ message: `Book with ID: ${bookId} was not found` })
    }

    await Book.findByIdAndDelete(bookId)
    return res.status(OK_CODE).json({ message: `Book with ID:${bookId} has been deleted ` })
  } catch (e: unknown) {
    const err = e as Error;
    res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: err.message });
  }
};

export default deleteBook;
