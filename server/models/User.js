const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})



 userSchema.post('save',  function(doc, next){
    next();
});

userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password  = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model("User", userSchema);

