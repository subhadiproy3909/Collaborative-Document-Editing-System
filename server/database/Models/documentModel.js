const mongoose = require('mongoose');


const documentSchema = new mongoose.Schema({
    owner: {
        type: String,
        ref: "User",
        // required: true,
    },
    title: {
        type: String,
        default: "untitled",
    },
    docId: {
        type: String,
        required: true,
        unique: true,
    },
    data: {
        type: Object,
        default: "",
    },
    users: {
        type: [String],
        ref: "User",
    }
}, {timestamps: true});


module.exports = mongoose.model("Document", documentSchema);