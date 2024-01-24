const jwt = require("jsonwebtoken");


const User = require('../database/Models/userModel');

const auth = async (req, res, next) => {
    try{

        if(req.cookies && req.cookies["token"]){
            const token = req.cookies["token"];
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            
            // console.log(`decoded id: ${decoded.id}`);
            const user = await User.findById(decoded.id).select('_id');
            
            // console.log(user);
            req.user = user._id;
        }
        next();
    }
    catch(error){
        throw new Error(`auth middleware error: ${error}`);
    }
}


module.exports = auth;