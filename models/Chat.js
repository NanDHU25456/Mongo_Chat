const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    name: String,
    message: String
})

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;