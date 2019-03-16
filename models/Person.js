const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    name: {
        type: String
    },
    googleID: {
        type: String
    },
    username: {
        type: String,
    },
    profilepic: {
        type: String,
        default: "http://learncode0nline.in/man-icon"
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = Person = mongoose.model("myperson", PersonSchema);