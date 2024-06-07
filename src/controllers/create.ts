import Book from '../models/book.ts';
import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE } from '../variables/statusCodes.ts';

// type ResponseType = {
//   message: string;
//   code: number;
//   data?: {
//     title: String;
//     pageCount: Number;
//     publishedDate: { data: String };
//     thumbnailUrl: String;
//     shortDescription: String;
//     longDescription: String;
//     status: String;
//     authors: String;
//   };
// };

const postBook = async (
  req: {
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
  // res: Response | ResponseType
) => {
  const { title, pageCount, publishedDate, thumbnailUrl, shortDescription, longDescription, status, authors } = req.body;
  try {
    const newBook = new Book({
      title,
      pageCount,
      publishedDate,
      thumbnailUrl,
      shortDescription,
      longDescription,
      status,
      authors,
    });

    const savedBook = await newBook.save();

    res.status(CREATED_CODE).json(savedBook);
  } catch (e: unknown) {
    const err = e as Error;
    res.status(INTERNAL_SERVER_ERROR_CODE).json({ error: err.message });
  }
};

export default postBook;
