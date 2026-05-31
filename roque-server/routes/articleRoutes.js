const express = require('express');
const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

const router = express.Router();

router.route('/').get(getArticles).post(createArticle);

// ID-based update and delete (dashboard)
router.route('/:id/update').put(updateArticle);
router.route('/:id/delete').delete(deleteArticle);

// Slug-based lookup (public article page) — must come after specific routes
router.get('/:name', getArticleByName);

module.exports = router;
