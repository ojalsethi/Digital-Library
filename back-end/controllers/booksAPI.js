const Book = require('../models/books');

const User = require('../models/users');

module.exports = {
    getBooks: (callback) => {
        Book.find(callback);
    },

    getBook: (id, callback) => {
        Book.findById(id, callback).populate({
            path: 'borrower._id',
            model: 'User'
        });
    },

    addBook: (newBook, callback) => {
        Book.create(newBook, callback);
    },

    updateBook: (id, updateBook, callback) => {
        Book.findByIdAndUpdate(id, updateBook, callback);
    },

    deleteBook: (id, callback) => {
        Book.findByIdAndRemove(id, callback);
    }

}

/*
    we can interact with mongoose in 3 ways

    1) Callbacks
    2) Promises
    3) Async/Await (Promises)
*/