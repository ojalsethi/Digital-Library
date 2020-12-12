var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        image: {
            type: String,
        },
        category: {
            type: String
        },
        available: {
            type: Boolean
        },
        borrower: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: 'users'            
            },
            borrowdate: {
                type: Date,
                default: Date.now
            }
        }]
    }
);

var Book = mongoose.model('Book', bookSchema);
module.exports = Book;