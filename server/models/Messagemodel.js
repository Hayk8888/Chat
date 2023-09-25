const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    receiverId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Message', messageSchema);

// todo 1. create get route to check user is auth and return the user data 2. get the data from front 3. create route to get users