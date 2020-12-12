const Notification = require('../models/notifications');

module.exports = {
    createNotification: (newNotification, callback) => {
        Notification.create(newNotification, callback);
    },

    getAllNotifications: (callback) => {
        Notification.find(callback);
    },

    deleteNotificationsbyId: (id, callback) => {
        Notification.findByIdAndRemove(id, callback);
    }
}