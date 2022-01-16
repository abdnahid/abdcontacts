const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { validationResult, check } = require('express-validator');
const auth = require("../middleware/auth");

const router = express.Router();


//@route       GET api/auth
//@desc        Get logged in user
//@access      Private
router.get("/", auth, async (req,res)=>{
    try {
        const user = await User.findById(req.userInfo.id).select("-password");
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("ServerError");
    }
})

//@route       POST api/auth
//@desc        login a user
//@access      private
router.post("/",[
    check("email","Please insert a valid message").isEmail(),
    check("password","Please enter password").exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;
    try {
        let findUser = await User.findOne({email});
        if (!findUser) {
            return res.status(400).json({msg:"invalid credentials"});
        }
        const isMatch=await bcrypt.compare(password,findUser.password);
        if (!isMatch) {
            return res.status(400).json({msg:"invalid credentials"});
        }
        const payload = {
            userIdentity: {id:findUser.id}
        }
        jwt.sign(payload,config.get("jwtSecret"),{expiresIn: 36000},(err,token)=>{
            if (err) {
                return err;
            }
            res.send({token});
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;