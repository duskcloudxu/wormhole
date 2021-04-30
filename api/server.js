/** SERVER CONFIGURATION */
const {
  ERROR_INFOR_FOR_MALI_USER,
  ERROR_INFOR_MISSING_CONVERSATION,
  ERROR_INFOR_MISSING_USER,
  ERROR_INFOR_DUPLICATE_USER
} = require("./constants");

const path = require('path')
const express = require("express");
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
// The origin is used by CORS
const CLIENT_CONTAINER_NAME = "localhost"
const CLINET_CONTAINER_PORT = "3000"
const origin = `http://${CLIENT_CONTAINER_NAME}:${CLINET_CONTAINER_PORT}`;

app.use(cors);

const io = require('socket.io')(server, {
  cors: {
    origin: origin,
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4002;

// temporarily block since not sure if we would use backend UI
// // When on Heroku, serve the UI from the build folder
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, 'build')));
//     app.get('*', (req, res) => {
//         res.sendfile(path.join(__dirname = 'build/index.html'));
//     })
// }

// // When on local host, server from the public folder.
// // Rule will not be written if production conditional has executed
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname+'public/index.html'));
// })

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

// store all conversation related information
let conversations = {};
// mapping of socket id to room pubkey for easier query
let memberToRoom = {};
// mapping of socket id to user pubkey for easier query
let socketIdToPubKey = {}

// TODO:only for testing, would delete in formal version
let showStatus = () => {
  console.log(new Date().toString() + "__________________________________")
  console.log(conversations);
  console.log(memberToRoom);
  console.log(socketIdToPubKey);
  console.log("__________________________________")
}

const removeUser = (roomPubKey,pubKey,socketId) =>{
  const deleteMember = conversations[roomPubKey].members.splice(
    conversations[roomPubKey].members.findIndex(
      item => item.pubKey === pubKey), 1);
  const {nickName} = deleteMember[0];
  delete socketIdToPubKey[socketId];
  delete memberToRoom[socketId];
  return nickName
}

const removeConversation = (roomPubkey,socketId)=>{
  const targetConversation = conversations[roomPubkey];
  targetConversation.members.forEach(item => {
    item.socket.emit("endSession");
    item.socket.disconnect();
    delete memberToRoom[item.socket.id];
    delete socketIdToPubKey[item.socket.id];
  })
  delete conversations[roomPubkey];
  delete socketIdToPubKey[socketId];
  delete memberToRoom[socketId];
}


io.on("connection", client => {
  client.emit("hello", "Server connected!")
  client.on("createConversation", member => {
    const {pubKey, nickName} = member;
    if (pubKey === undefined || nickName === undefined) {
      client.emit("error", ERROR_INFOR_FOR_MALI_USER);
      client.disconnect();
      return;
    }
    if (!(pubKey in conversations)) {
      console.log(
        `new conversation generated with ${pubKey} ${client.id} ${nickName}`);
      conversations[pubKey] = {
        members: [
          {
            pubKey,
            nickName,
            socket: client
          }
        ]
      }
      memberToRoom[client.id] = pubKey;
      socketIdToPubKey[client.id] = pubKey;
    } else {
      console.log(`duplicate pubkey`);
      client.emit("error", ERROR_INFOR_FOR_MALI_USER);
      client.disconnect(ERROR_INFOR_FOR_MALI_USER);
    }
    showStatus();
  });

  client.on("joinConversation", member => {
    const {hostPubkey, nickName, pubKey} = member;
    console.log(member);
    if (hostPubkey === undefined || nickName === undefined || pubKey
      === undefined) {
      console.log(
        "a client is disconnected due to missing parameters in joinConversation");
      client.emit("error", ERROR_INFOR_FOR_MALI_USER);
      client.disconnect();
      return
    }
    if (client.id in memberToRoom) {
      client.emit("pong", ERROR_INFOR_DUPLICATE_USER);
      return
    }
    if (!(hostPubkey in conversations)) {
      console.log("a client is disconnected due to missing corresponding ");
      client.emit("error", ERROR_INFOR_MISSING_CONVERSATION);
      client.disconnect();
      return
    }
    conversations[hostPubkey].members.push({
      pubKey,
      nickName,
      socket: client
    })
    memberToRoom[client.id] = hostPubkey
    socketIdToPubKey[client.id] = pubKey
    const res = {
      nickName,
      pubKey,
    }
    conversations[hostPubkey].members[0].socket.emit("joinMessage", res);
    showStatus();
    client.emit("pong", `joined conversation ${hostPubkey} as ${nickName}`);
  })

  client.on("sendMessage", message => {
    const {ciphertext, cipherPubKey} = message
    const senderPubKey = socketIdToPubKey[client.id];
    const roomPubKey = memberToRoom[client.id];
    if (cipherPubKey === undefined || ciphertext === undefined || senderPubKey
      === undefined) {
      client.emit("error", ERROR_INFOR_FOR_MALI_USER);
      client.disconnect();
      return
    }
    const targets = conversations[roomPubKey].members.filter(
      item => item.pubKey === cipherPubKey);
    if (targets.length === 0) {
      client.emit("pong", ERROR_INFOR_MISSING_USER);
      return
    }
    const res = {
      ciphertext,
      senderPubKey
    }
    targets[0].socket.emit('receiveMessage', res)
    client.emit("pong", `message sent`);
    showStatus();
  });

  client.on("userExit", message => {
    const pubKey = socketIdToPubKey[client.id];
    const roomPubKey = memberToRoom[client.id];
    if (!roomPubKey || !pubKey) {
      client.emit("error", ERROR_INFOR_FOR_MALI_USER);
      client.disconnect();
      return;
    }
    const nickName = removeUser(roomPubKey,pubKey,client.id);
    client.disconnect();

    const res = {
      pubKey,
      nickName,
    }
    console.log(`user ${pubKey} exited`);
    conversations[roomPubKey].members[0].socket.emit("leaveMessage",res);
  });

  client.on("endSession", () => {
    const pubKey = socketIdToPubKey[client.id];
    const roomPubkey = memberToRoom[client.id];
    if (!pubKey || !roomPubkey || pubKey !== roomPubkey) {
      client.emit("error", ERROR_INFOR_FOR_MALI_USER);
      client.disconnect();
      return;
    }
    removeConversation(roomPubkey,client.id);
    console.log(`session ${roomPubkey} ended`);
    showStatus();
    client.disconnect();
  })

  client.on("disconnect", (reason)=>{
    const pubKey = socketIdToPubKey[client.id];
    const roomPubkey = memberToRoom[client.id];
    if(!pubKey && !roomPubkey){
      return;
    }
    else if(pubKey !== roomPubkey){
      const nickName = removeUser(roomPubkey,pubKey,client.id);
      const res = {
        pubKey,
        nickName,
      }
      conversations[roomPubkey].members[0].socket.emit("leaveMessage",res);
    }
    else if(pubKey === roomPubkey){
      removeConversation(roomPubkey,client.id)
    }
    showStatus();
  })

})

