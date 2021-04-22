/** SERVER CONFIGURATION */
const path=require('path')
const express = require("express");
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
// The origin is used by CORS
const origin = "http://localhost:3000"; 

app.use(cors);

const io = require('socket.io')(server, { 
    cors: {
      origin: origin,
      methods: ["GET", "POST"]
    }
  });

//Database
connectDB();
const Conversation = require('./models/Conversation');

const createConversation = async (hostPubkey) => {
    let res = await new Conversation({ hostPubkey: hostPubkey, messages: [] }).save();
    return res;
}

const findConversation = async (hostPubkey) => {
    let res = await Conversation.findOne({ hostPubkey: hostPubkey });
    return res;
}

const addMessage = async (hostPubkey, message) => {
    let mathcedConversation = await Conversation.findOne({ hostPubkey: hostPubkey });
    let updatedMessages = [...mathcedConversation.messages, message]
    mathcedConversation.messages = updatedMessages;
    await mathcedConversation.save();
    console.log(mathcedConversation);
    return mathcedConversation;
}

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;
 
// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === 'production') {  
    app.use(express.static(path.join(__dirname, 'build')));  
    app.get('*', (req, res) => {    
        res.sendfile(path.join(__dirname = 'build/index.html'));  
    })
}

// When on local host, server from the public folder. 
// Rule will not be written if production conditional has executed
app.get('*', (req, res) => {  
    res.sendFile(path.join(__dirname+'public/index.html'));
})

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

let messages = [];
let members = [];

io.on("connection", client => {

    client.emit("hello", "Server says hello to" + client.id)
    client.on("createConversation", member => {
        if (members.length < 2){
            let host = member;
            let pubKey = member.pubKey;
            let nickName = member.nickName;
            members.push(host);
            createConversation(pubKey);
            //Add the host to the room
            client.join(pubKey);
            messages.push(nickName + " has created the chat");
            io.to(pubKey).emit('broadcast', messages);
            console.log(host)
        } else {
            // Reject connection when chat room is full
            client.disconnect();
        }
    });

    client.on("joinConversation", member => {
        let invitationCode = member.hostPubkey;
        client.join(invitationCode);
        let nickName = member.nickName;
        let joinNotification = nickName + " joined the room by code: " + invitationCode;
        messages.push(joinNotification);
        io.to(invitationCode).emit("broadcast", messages);
    })

    client.on("chatMessage", message => {
        messages.push(message.plainText);
        addMessage(message.sender.hostPubkey, message);
        io.to(message.sender.hostPubkey).emit("broadcast", messages);
    });
})

