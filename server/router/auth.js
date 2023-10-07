const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const MailService = require('../controllers/mailController')
const authValidation = require("../middleware/authValidation");
const checkAuth = require("../middleware/checkAuth");
const Message =  require('../models/Messagemodel');
const Chat =  require('../models/Chatmodel');
const User = require('../models/User');
const File = require('../models/filemodel');
const mongoose = require("mongoose");
const uploader = require('../middleware/uploader')
const {writeFile} = require('fs');



router.post('/signin', authValidation, authController.signin_post)
router.get('/signin', authController.signin_get)
router.get('/signup', authController.signup_get)
router.get('/me', checkAuth, authController.me)
router.post('/signup', authValidation, authController.signup_post);
router.post("/uploads", uploader.single('uploadFile'),(req, res) => {
    res.status(200)
});

router.get('/users', checkAuth, async (req, res) => {
    try {
        console.log(req.user);
        const myUserId = new mongoose.Types.ObjectId(req.user._id)

        const user = await User.find({'_id': {$ne: myUserId}});

        //another variant :D

        // const myEmail = req.user.email;
        // const user = await User.find({'email': {$ne: myEmail}});

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal error" });
    }
});

router.post('/chat', async (req, res) => {
    try{
       const chat = await Chat.create(req.body);
       res.status(201).json(chat);
    }catch(err){
         res.status(400).send(err);
    }

})

router.post('/sendmail', async (req, res) => {
    const { to, message } = req.body;
    await MailService.sendActivationMail(to, message);
    res.json({message: "sdg"})
})

module.exports = router