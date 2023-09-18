const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authValidation = require("../middleware/authValidation");
const checkAuth = require("../middleware/checkAuth");
const Message =  require('../models/Messagemodel');
const Chat =  require('../models/Chatmodel');


router.post('/signin', authValidation, authController.signin_post)
router.get('/signin', authController.signin_get)
router.get('/signup', authController.signup_get)
router.get('/me', checkAuth, authController.me)
router.post('/signup', authValidation, authController.signup_post)

router.post('/chat', async (req, res) => {
    try{
       const chat = await Chat.create(req.body);
       res.status(201).json(chat);
    }catch(err){
         res.status(400).send(err);
    }

})

module.exports = router