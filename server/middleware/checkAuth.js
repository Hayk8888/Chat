const jwt = require("jsonwebtoken");
const User = require('../models/User')
const secretKey = "helloworld123";

module.exports = async function (req, res, next) {
    const headers = req.headers.authorization;

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(400).json({ message: "No token provided" });
    }

// Check if the authorization header starts with "Bearer "
    if (!authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Invalid token format" });
    }


    const bearertoken = authorizationHeader.substring(7);

     if(!bearertoken) {
         return res.status(401).json({message: "berer token is invalid"})
     }


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