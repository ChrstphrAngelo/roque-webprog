const Article = require('../models/Article');

// Helper: build a URL-friendly slug from a title
const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Helper: normalize content into an array of non-empty paragraphs
const normalizeContent = (content) => {
  if (Array.isArray(content)) return content.filter((p) => String(p).trim());
  if (typeof content === 'string') {
    return content
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [];
};

const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    res.json({ articles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({ name: req.params.name });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, name, image, content, isActive } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const article = await Article.create({
      title,
      name: name ? slugify(name) : slugify(title),
      image: image || '',
      content: normalizeContent(content),
      isActive: typeof isActive === 'boolean' ? isActive : true,
    });

    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const update = { ...req.body };

    if (update.name) update.name = slugify(update.name);
    if (update.content !== undefined) update.content = normalizeContent(update.content);

    const article = await Article.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
};
