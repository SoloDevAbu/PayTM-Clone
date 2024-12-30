const JWT_SECRET = require("../config");
const { User } = require("../db/db");
const {userInput, updateUserInput} = require("../inputvalidation/userInput");
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => {
    const validation = userInput.safeParse(req.body);

    if(!validation.success) {
        res.status(400).json({
            msg: 'Please provide valida inputs',
            error: validation.error.errors
        })
    }

    const {firstName, lastName, username, email, password} = validation.data;

    try {
        const existingUser = await User.findOne({username})
        if(existingUser){
            return res.status(411).json({
                msg: 'User already exist'
            })
        }
        const user = await User.create({
            firstName,
            lastName,
            username,
            email,
            password
        })

        const userId = user._id;
        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.status(200).json({
            msg: 'User created successfully',
            token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getUser = async (req, res) => {
    const {username, password} = req.headers;

    try {
        const user = await User.findOne({username, password});

        if(!user){
            res.status(404).json({
                msg: 'User not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const updateUser = async (req, res) => {
    const {email} = req.headers;
    const validation = updateUserInput.safeParse(req.body);

    if(!validation.success) {
        return res.status(400).json({
            msg: 'Please provide valid inputs'
        })
    }

    const {firstName, lastName, username, password} = validation.data;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                msg: 'user not found'
            })
        }
        await User.findOneAndUpdate({
            email
        }, {
            firstName,
            lastName,
            username,
            password
        })

        res.status(200).json({
            msg: 'User updated successfully',
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser
}