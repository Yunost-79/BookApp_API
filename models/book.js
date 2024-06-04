import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: String,
    pageCount: Number,
    publishedDate: {
      date: String,
    },
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: [String],
  },
  { timestamps: true, versionKey: false }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
