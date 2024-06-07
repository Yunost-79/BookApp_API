import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    pageCount: { type: String, required: true },
    publishedDate: {
      data: { type: Date, required: true, default: Date.now },
    },
    thumbnailUrl: { type: String, required: true },
    shortDescription: { type: String },
    longDescription: { type: String },
    status: { type: String, enum: ['PUBLISH', 'DRAFT', 'DROPPED'], default: 'PUBLISH' },
    authors: [{ type: String, required: true }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
