const express = require('express');
const { getLinks, createLink, deleteLink } = require('../controllers/linkController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', getLinks);
router.post('/', authMiddleware, createLink);
router.delete('/:id', authMiddleware, deleteLink);
module.exports = router;