const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_CONNECT);

        console.log(`database connected to: ${conn.connection.host}`);
    } catch (error) {
        throw new Error(error);
    }
}


module.exports = connectDB;