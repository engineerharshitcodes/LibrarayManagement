const express=require('express');
const router= express.Router();
const {books}= require('../data/books.json');


//get all books
router.get('/', function(req, res) {
    return res.status(200).json({
        message: 'Books retrieved successfully',
        data: books
    });
});

//get book by id
router.get('/:id', function(req, res) {
    const bookId=req.params.id;
    const book = books.find(b => b.id === bookId);

    if(!book){
        return res.status(404).json({
            message: `Book with id ${bookId} not found`
        });
    }
   
    return res.status(200).json({
        message: `Book with id ${bookId} retrieved successfully`,
        data: book
    });
});

//create a new book
router.post('/', function(req, res) {
    const{ id, author, genre } = req.body;
    //validate request body
    if(!id || !author || !genre) {
        return res.status(400).json({
            message: 'Please provide id, author and genre for the book'
        });
    }
    const newBook = req.body;
    const BookExists = books.find(b => b.id === newBook.id);   
    if(!BookExists){
        books.push(newBook);
        return res.status(201).json({
            message: 'Book created successfully',
            data: newBook
        });
    }
        return res.status(400).json({
            message: `Book with id ${newBook.id} already exists`
        });

});

//update book by id
router.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(b => b.id == bookId);

    if (index === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    Object.assign(books[index], req.body);

    return res.json({
        message: 'Book updated successfully',
        data: books[index]
    });
});


//delete book by id
router.delete('/:id', function(req, res) {
    const bookId = req.params.id;   
    const bookIndex = books.findIndex(b => b.id === bookId);    
    if (bookIndex === -1) {
        return res.status(404).json({
            message: `Book with id ${bookId} not found`
        });
    }   
    books.splice(bookIndex, 1);
    return res.status(200).json({
        message: `Book with id ${bookId} deleted successfully`
    });
});

//all issued books
router.get('/issued', function(req, res) {
    const userWithIssuedBooks = users.filter((each)=>{
        if(each.issuedBook){
            return each;
        }
     
        const issuedBooks=[];
        userWithIssuedBooks.forEach((each)=>{   
        const book= books.find((book)=>book.id===each.issuedBook);

        book.issuedBy=each.name;
        book.issuedDate=each.issuedDate;
        book.returnDate=each.returnDate;

        issuedBooks.push(book);
        
    });

    if(issuedBooks.length===0){
        return res.status(404).json({
            message: 'No books are issued currently'
        });

             res.status(200).json({
            message: 'Issued books retrieved successfully',
            data: issuedBooks
        });
       }
   });
});

module.exports= router;