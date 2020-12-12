var express = require('express');
var router = express.Router();

var Notifications = require('../controllers/notificationAPI');
var Notification = require('../models/notifications');

router.post('/', (req, res)=>{
    var newNotification = {
        message: req.body.message
    }
    Notifications.createNotification(newNotification, (error, notifications) => {
        if (error) {
            res.json({success: false, msg:'Failed to add notification'});
        } else {
            res.json({success: true, msg:'notification added successfully', notification:notifications});
        }
    })
})

router.get('/', (req, res)=>{
    Notifications.getAllNotifications((error, notifications) => {
        if (error) {
            throw error
        } else {
            res.json(notifications);
        }
    })
})

router.delete('/:id', (req,res) => {
    Notifications.deleteNotificationsbyId(req.params.id, (error, notifications) => {
        if (error) {
            res.json({success: false, msg:'Notification delete failed'})
        } else {
            res.json({success:true, msg:'Notification removed'})
        }
    })
})

module.exports = router;