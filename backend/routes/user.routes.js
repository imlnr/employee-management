const express = require('express');
const { UserModel } = require('../models/user.model');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userexist = await UserModel.findOne({ email: email });
        if (userexist) {
            return res.status(400).json({ error: "Email is already Registered!" })
        }
        bcrypt.hash(password, 8, async (err, hash) => {
            if (hash) {
                const user = new UserModel({ email, password: hash });
                await user.save();
                res.status(201).send({ "msg": "New user has been registered successfull !" })
            }
            else {
                res.send({ "msg": "Error creating the hash", "error": err })
            }
        })
    } catch (error) {
        res.send({ "msg": error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(402).json({ error: "User Does not Exist, please register" })
        }
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ userID: user._id, email: user.email }, "masai", { expiresIn: '7d' });
                // localStorage.setItem("token", token);
                res.json({ "msg": "Login Successfull", "token": token })
            }
            else {
                console.log(err);
                res.status(403).send({ "error": "Wrong Credentials", err });
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ "error": error });
    }
})

module.exports = {
    userRouter
}