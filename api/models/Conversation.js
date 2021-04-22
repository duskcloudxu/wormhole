const mongoose = require('mongoose');
const ConversationSchema = new mongoose.Schema({
    hostPubkey: {
        type: String,
        required: true
    },
    messages: {
        type: [Map],
        default: [{}]  
    },
    date:{
        type: Date,
        default: Date.now
    }
})
module.exports = Conversation = mongoose.model('conversation', ConversationSchema);