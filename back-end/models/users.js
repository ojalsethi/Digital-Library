var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({ 
    name: {
        type: String,
        required: true
    },      
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bookmarks:[{
        type: Schema.Types.ObjectId,        
        ref: 'books'               
    }],
    borrows:[{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'books'
        },
        borrowdate: {
            type: Date,
            default: Date.now
        }
    }],
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default: 'User'
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;