const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isVarified: {
        type: Boolean,
        default: false,
    }
}, 
{
    timestamps: true,
});


userSchema.methods.comparePassword = async function(plainPassword){
    return bcrypt.compare(plainPassword, this.password);
}


userSchema.pre("save", async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model("User", userSchema);