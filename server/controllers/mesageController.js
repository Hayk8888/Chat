const Message = require("../models/Messagemodel");
const File = require('../models/filemodel');
const {writeFile} = require("fs");
const path = require("path");
const fs = require('fs');



// module.exports = (io) => {
//     io.on('connection', (socket) => {
//         console.log("socket id", socket.id)
//
//         socket.on("upload", (file, callback)  => {
//             console.log(file);
//
//
//             writeFile("../uploads", file, (err) => {
//                 callback({message: err ? "err" : "success"});
//             })
//
//             try {
//                 const fileName = file.name;
//                 const filePath = path.join(__dirname, "../uploads", fileName);
//                 console.log('sdbfshf')
//                 // Write the file to the server
//                 fs.writeFileSync(filePath, file.data, 'base64');
//
//                 console.log(`Uploaded file: ${fileName}`);
//
//                 if (callback && typeof callback === 'function') {
//                     callback({ status: 'success', message: 'File uploaded successfully' });
//                 }
//
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//
//                 callback({ status: 'error', message: 'File upload failed' });
//             }
//         });
//
//         socket.on('message', async msg => {
//             try {
//
//                 let fileId = null;
//
//                 if(msg.file) {
//                     const file = new File({
//                         type: msg.file.type,
//                     });
//                     const saveFile = await file.save();
//                     fileId = saveFile._id
//                 }
//                 const message = new Message({
//                     receiverId: msg.receiverId,
//                     senderId: msg.senderId,
//                     message: msg.messageContent,
//                     fileId: fileId
//                 });
//
//                 await message.save()
//
//                 io.emit('message', {});
//             } catch (err) {
//                 console.error('Error saving messages', err);
//             }
//             io.emit('message', msg);
//         });
//         socket.on('test', async msg => {
//             console.log("asdasasdasdasdasd");
//         })
//     });
// }


function generateUniqueFilename() {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${timestamp}_${randomString}`;
}

module.exports =  (io) => {
    io.on('connection', (socket) => {
        console.log("socket id", socket.id)

        socket.on("upload", (file, callback) => {
            console.log(file);

            const filename = generateUniqueFilename();

            const filePath = `./uploads/${filename}`;

            const buffer = Buffer.from(file);





            console.log(buffer);
            console.log(buffer.toJSON());
            writeFile(filePath, buffer, (err) => {
            callback({message: err ? "err" : "success"});
            })
        })
    })
}

