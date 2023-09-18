const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    users: [{
        type: String,
        required: true,
    }]
});


module.exports = mongoose.model('Chat', chatSchema);
