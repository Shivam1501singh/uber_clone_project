const userModel = require("../models/user.model");
const userService = require("../services/user.serverice");
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {fullname, email, password} = req.body;
    const isUserExist = await userModel.findOne({email});
    if(isUserExist) {
        return res.status(400).json({message: "User already exists"});
    }
    const user = await userService.createUser({
        firstName: fullname.firstname,
        lastName: fullname.lastname,
        email: email,
        password: password
    });
    const token= user.generateAuthToken();

    res.status(201).json({token, user});
}