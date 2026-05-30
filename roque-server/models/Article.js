const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // slug used in the URL
    title: { type: String, required: true },
    image: { type: String, default: '' }, // optional image URL
    content: { type: [String], default: [] }, // array of paragraphs
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
