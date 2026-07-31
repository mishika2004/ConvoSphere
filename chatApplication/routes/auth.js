const express = require('express');
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv=require("dotenv");
const router=express.Router();

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET; 

router.post("/register", async(req, res)=> {
    const {username, password} = req.body;
    try{
        const existingUser = await User.findOne({username});
        if(existingUser) {
            return res.status(400).json({message: "User already exists. PLease Login."});
        }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password,salt);
    //it will take the password that u provide and add more strings  to ur existing password and then save it
    //to make passwords more secure before saving
    //gensalt is  a method provided by bcrypt
    //10 is the recommended cost for processing the data.
    const user = new User({username: username, password: hashedPassword});
    await user.save();
    const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: "4h"});
    res.status(201).json({ message: "User registered successfully", token, username}); 
} 
  catch(error){
      res.status(500).json({message: "Server Error", error: error});
  }
});

//Login
router.post("/login", async(req, res)=> {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user) return res.status(404).json({message: "User not found"});
        
        const isPasswordMatch = await user.comparePassword(password);
        if(!isPasswordMatch) return res.status(400).json({message: "Invalid credentials"});

        res.status(200).json({message: "Login Successful", username: user.username});
    }
    catch(error){
        res.status(500).json({message: "Server Error while login.", error: error});
    }
});

module.exports = router;