const jwt = require("jsonwebtoken");
const User = require('../models/User')
const secretKey = "helloworld123";

module.exports = async function (req, res, next) {
    const headers = req.headers.authorization;

    if (!headers) {
        return res.status(400).json({message: "no token"})
    }

    const token = headers.split(" ")[1]

    if (!token) {
        return res.status(400).json({message: "no auth token"})
    }

    let decoded = false;

    try {
        decoded = jwt.verify(token, secretKey);
        const  user =  {id: userId}
        const token = jwt.sign(user, secretKey, { expiresIn: '60y' });
    } catch (e) {
        return res.status(400).json({message: "token not valid"})
    }

    if (!decoded) {
        return res.status(400).json({message: "token has expired"})
    }

    const user = await User.findById(decoded._id);

    if (!user) {
        return res.status(400).json({message: "user doesn't exists!"})
    }

    req.user = user;
    next()
}