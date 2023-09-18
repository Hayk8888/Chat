const mongoose = require("mongoose")

async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

         const db = mongoose.connection;

         db.on('error', console.error.bind(console, 'MongodB connecton error'));
         db.once('open', () => {
             console.log('Connection to MongoDb')
         })
        console.log("mongo to connected")
    } catch (err) {
        console.error('error  to connect', err)
    }
}


module.exports = dbConnect
