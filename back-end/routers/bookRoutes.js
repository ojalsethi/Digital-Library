var express = require('express');
var router = express.Router();

var Books = require('../controllers/booksAPI');
var Book = require('../models/books');

router.get('/books', (req, res, next) => {
    Books.getBooks( (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json(books);
        }
    });
})

router.post('/books', (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        category: req.body.category,
        available: req.body.available
    }
    console.log(newBook);    
    Books.addBook(newBook, (error, books) => {
        if (error) {
            res.json({success: false, msg:'Failed to register the user'});
        }else {
            res.json({success: true, msg:'book registered', book:books});
        }
    });
})

router.get('/books/:_id', (req, res, next) => {
    Books.getBook(req.params._id,(error, books) => {
        if (error) {
            throw error;           
        }else {
            res.json({success: true, msg:'book found', book:books});
        }
    });
})

router.put('/books/:_id',  (req, res) => {
    var update = {
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        category: req.body.category,
        available: req.body.available
    }
    Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json({success: true, msg:'book edited', book:books});
        }
    })
})

router.delete('/books/:id', (req, res) => {
    Books.deleteBook(req.params.id, (error, books) => {                
        if (error) {
            res.json({success: false, msg:'book delete failed'});
        }else {
            res.json({success: true, msg:'book deleted', deletedbook:books});
        } 
    })
})

router.patch('/books/:_id', (req, res) => {
    var update = req.body;
    Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error;
        }else {
            res.json({success: true, msg:'book updated with a patch', book:books});
        }
    })
})

router.patch('/book/:_id', async (req, res)=>{
    //This is used to update the availability of the book as well as to remove the last borrower of book

    //find the book by _id
    const book = await Book.findById(req.params._id);

    const bookBorrower = book.borrower[0];
    
    //pop the borrower
    if (book.borrower.length > 0) {        
        book.borrower.pop();
    }

    //save the book
    await book.save();

    //patch with availability status true
    var update = req.body;
    await Books.updateBook(req.params._id, update, (error, books) => {
        if (error) {
            throw error
        } else {
            res.json({success: true, msg:'Book made available - removed borrower', borrowedUser: bookBorrower})
        }
    })


})

module.exports = router;

