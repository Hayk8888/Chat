const User = require('../models/User')
const {sign} = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");


exports.logout_get = (req, res) => {
    res.send("logout");
}
exports.logout_post = (req, res) => {
    res.send("logout");
}

exports.login_post = (req, res) => {
    res.send("login");
}

exports.login_get = (req, res) => {
    res.send("login");
}

exports.signup_get = (req, res) => {
    res.send("signup");
}

exports.signup_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const isExists = await User.findOne({email})

    if (isExists) {
        return res.status(400).json({message: "this user is exists"})
    }

    const user = await User.create({email, password})

    res.status(201).json({success: true})
}

exports.signin_get = (req, res) => {

}

exports.signin_post = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const isExists = await User.findOne({email}).exec()

    if (!isExists) {
        return res.status(400).json({message: "this user doesn't exists"})
    }

    const {password: hashed, ...userData} = JSON.parse(JSON.stringify(isExists))

    if (!bcrypt.compareSync(password, hashed)) {
        return res.status(400).json({message: "password is invalid"})
    }

    const secretKey = "helloworld123"
    const token = await sign(userData, secretKey, {expiresIn: '1y'});

    res.status(201).json({token})
}

exports.me = async (req, res) => {
    res.json(req.user)
}