const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('Message', messageSchema);