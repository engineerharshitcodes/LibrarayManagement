const { UserModel, BookModel } = require('../models');
const IssuedBook = require('../DTO/book-dto'); // ← Capitalized if class is capitalized

// Get all books (CHANGED FROM getAllUsers)
exports.getAllBooks = async function(req, res) {
    const books = await BookModel.find();
    
    if(books.length === 0){
        return res.status(404).json({
            message: 'No books found'
        });
    }
    
    return res.status(200).json({
        message: 'Books retrieved successfully',
        data: books
    });
};

// Get book by id
exports.getBookById = async function(req, res) {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);

    if(!book){
        return res.status(404).json({
            message: `Book with id ${bookId} not found`
        });
    }
    
    return res.status(200).json({
        message: `Book with id ${bookId} retrieved successfully`,
        data: book
    });
};

// Get all issued books
exports.getAllIssuedBooks = async function(req, res) {
    const users = await UserModel.find({ 
        issuedBook: { $exists: true }
    }).populate('issuedBook');

    const issuedBooks = users.map(each => {
        return new IssuedBook(each); // ← Make sure this matches your import
    });

    if(issuedBooks.length === 0){ 
        return res.status(404).json({
            message: 'No books are issued currently'
        });
    }
    
    return res.status(200).json({  
        message: 'Issued books retrieved successfully',
        data: issuedBooks
    });
};

// Create a new book
exports.addNewBook = async function(req, res) {
    const data = req.body;
    
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            message: 'Please provide book details'
        });
    }

    await BookModel.create(data);
   
    return res.status(201).json({
        message: 'Book created successfully',
        data: data
    });
};

// Update book by id
exports.updateBookById = async function(req, res) {
    const bookId = req.params.id;
    const data = req.body;
    
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            message: 'Please provide book details to update'
        });
    }
    
    const book = await BookModel.findById(bookId);

    if(!book){
        return res.status(404).json({
            message: `Book with id ${bookId} not found`
        });
    }
    
    Object.assign(book, data);
    await book.save();
    
    return res.status(200).json({
        message: 'Book updated successfully',
        data: book
    });
};

// Delete book by id
exports.deleteBookById = async function(req, res) {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);

    if(!book){
        return res.status(404).json({
            message: `Book with id ${bookId} not found`
        });
    }
    
    await book.deleteOne();
    
    return res.status(200).json({
        message: `Book with id ${bookId} deleted successfully`
    });
};