const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const directoryPath = path.join(__dirname, '..', 'uploads');

        fs.mkdir(directoryPath, {recursive: true}, (err) => cb(err, directoryPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
});

module.exports = upload