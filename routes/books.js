const express = require('express');
const router = express.Router();
const { getAllBooks, getAllIssuedBooks, getBookById, addNewBook, updateBookById, deleteBookById } = require('../controllers/bookC');

router.get('/', getAllBooks);
router.get('/issued', getAllIssuedBooks);
router.get('/:id', getBookById);
router.post('/', addNewBook);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);

module.exports = router;