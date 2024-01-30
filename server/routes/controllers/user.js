const User = require("../../database/Models/userModel");
const generateToken = require("../services/generateToken");
const bcrypt = require('bcrypt');


const signup = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        
        const isExists = await User.findOne({email});

        if(isExists){
            return res.sendStatus(403);
        }

        const user = await User.create({
            username, email, password,
        });

        if(user){
            const token = await generateToken(user._id);

            res.cookie('token', token, { expires: new Date(Date.now() + (2 * 60 * 60 * 1000)), httpOnly: true, });
            return res.json({
                username: user.username,
                email: user.email,
            })
        }
    }
    catch(error){
        throw new Error(error);
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email});

        if(!user || await user.comparePassword(password) === false){
            return res.sendStatus(404);
        }

        const token = await generateToken(user._id);
        res.cookie('token', token, { expires: new Date(Date.now() + (2 * 60 * 60 * 1000)), httpOnly: true, });
        return res.json({
            username: user.username,
            email: user.email,
        })
    }
    catch(error){
        throw new Error(`login user: ${error}`);
    }
}

const checkAuth = async (req, res) => {
    try {
        if(req.cookies && req.cookies['token']){
            const auth = req.user;

            const user = await User.findOne({_id: auth});

            if(user){
                return res.json({
                    username: user.username,
                    email: user.email,
                })
            }
        }
        else{
            return res.sendStatus(500)
        }
    } catch (error) {
        throw new Error(`check auth error: ${error}`);
    }
}


module.exports = { signup, login, checkAuth };