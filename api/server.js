/** SERVER CONFIGURATION */
const path=require('path')
const express = require("express");
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
// The origin is used by CORS
const origin = process.env.NODE_ENV === "production" ? 
        "app-name.herokuapp.com" : "http://localhost:3000"; 

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

const createConversation = (hostPubkey) => {
    let res = new Conversation({ hostPubkey: hostPubkey, messages: [] }).save();
    return res;
}

const findConversation = (hostPubkey) => {
    Conversation.findOne({ hostPubkey: hostPubkey }, function (err, conversation) {
        console.log("FOUND conv: " + conversation.hostPubkey)
        return conversation;
    });
}

const addMessage = (hostPubkey, message) => {
    Conversation.findOne({ hostPubkey: hostPubkey }, function (err, conversation) {
        let updated = [...conversation.messages, message]
        conversation.messages = updated;
        conversation.save()
        return conversation;
    });
}

// console.log("created: ")
// console.log(createConversation("owaif1113o"))
// const testMsg = {
//     sender: {
//               nickName: "tom",
//               pubKey: "asdf131fasdf",
//               hostPubkey: "owaif1113o"
//              },
//     plainText: "Hellow this is plaintext"
//   }

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
        io.to(invitationCode).emit(messages);
    })

    client.on("chatMessage", (member, plainText, hostPubkey) => {
        messages.push(plainText);
        io.sockets.emit("broadcast", plainText)
    });
     
})

