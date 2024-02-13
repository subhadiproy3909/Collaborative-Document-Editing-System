const jwt = require('jsonwebtoken');


const generateToken = async (id) => {
    try {
        const token = jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: 60});

        return token;
    } catch (error) {
        throw new Error(`generate token ${error}`);
    }
}


module.exports = generateToken;