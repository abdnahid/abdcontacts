const express = require("express");
const { check,validationResult } = require("express-validator");
const router = express.Router();
const auth =require("../middleware/auth");
const Contact = require("../models/Contacts");


//@route       GET api/contacts
//@desc        Get all users contacts
//@access      Private
router.get("/",auth,async(req,res)=>{
    try {
        const contact = await Contact.find({user:req.userInfo.id}).sort({date:-1});
        res.json(contact);
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

//@route       POST api/auth
//@desc        add new contacts
//@access      Private
router.post("/",[auth,[
    check("name","Name is required for the contact").not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,phone,type}=req.body;
    try {
        const newContact = await new Contact({
            name,
            email,
            phone,
            type,
            user:req.userInfo.id
        });
        const contact=await newContact.save();
        res.json(contact);
    } catch (err) {
        console.log(err.message);
    }
})


//@route       PUT api/contacts/:id
//@desc        update contacts
//@access      Private
router.put("/:id",auth,async(req,res)=>{
    //setup store updated contact field data
    const {name,email,phone,type}=req.body;
    const contactFields = {};
    if (name) {contactFields.name=name}
    if (email) {contactFields.email=email}
    if (phone) {contactFields.phone=phone}
    if (type) {contactFields.type=type}
    
    //update contact field data with token
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({msg:"No such contact is found"});
        }
        if (contact.user.toString() !== req.userInfo.id) {
            return res.status(401).json({msg: "Unauthorized to make the changes"});
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,{$set:contactFields},{new:true});
        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})


//@route       DELETE api/contacts/:id
//@desc        delete contacts
//@access      Private
router.delete("/:id",auth,async(req,res)=>{
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({msg:"No such contact is found"});
        }
        if (contact.user.toString() !== req.userInfo.id) {
            return res.status(401).json({msg: "Unauthorized to make the changes"});
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({msg:"Deleted the contact"});

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;
