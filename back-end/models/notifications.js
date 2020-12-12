var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = Schema(
    {
        message: {
            type: String,
            required: true
        }        
    }
);

var Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;

