const express = require('express');

const router = express.Router();

// Article routes will be implemented in Enhancement 2
router.get('/', (req, res) => res.json({ articles: [] }));

module.exports = router;
