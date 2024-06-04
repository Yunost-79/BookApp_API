import Book from "../models/book.js";

const postBook = async (req, res) => {
  const {
    title,
    pageCount,
    publishedDate,
    thumbnailUrl,
    shortDescription,
    longDescription,
    status,
    authors,
  } = req.body;

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

    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default postBook;
