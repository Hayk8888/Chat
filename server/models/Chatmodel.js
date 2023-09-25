const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    users: [{
        type: String,
        required: true,
    }]
});


module.exports = mongoose.model('Chat', chatSchema);
