//user routes
const express=require('express');
const router=express.Router();
const signup=require('../controllers/signup.controller.js');
const validateSignup=require('../middleware/validateSignup.middleware.js');



// Create a new user
router.post('/signup',validateSignup,signup);


module.exports=router;