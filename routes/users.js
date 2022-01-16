const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const { validationResult, check } = require('express-validator');

//@route       POST api/users
//@desc        Register a user
//@access      Public
router.post("/", [
    check("name","name is required").not().isEmpty(),
    check("email","please include a valid email").isEmail(),
    check("password","Please enter a passord of at least 6 characters").isLength({min:6})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body;

    try {
        let user = await User.findOne({email});
        if (user) {
            res.status(400).json({msg:"User already exists. Please login to continue"});
        }
        user = new User({
            name,
            email,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();
        
        const payload = {
            userIdentity: {id:user.id}
        }
        jwt.sign(payload,config.get("jwtSecret"),{expiresIn: 36000},(err,token)=>{
            if (err) {
                return err;
            }
            res.send({token});
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server very very Error");
    }
})

module.exports = router; 