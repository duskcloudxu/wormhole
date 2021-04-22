import store from "./redux/store";
import {newMessage} from "./redux/actions";

/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host = process.env.NODE_ENV === 'production' ?
    "appname.herokuapp.com" : "localhost:4002"   
let socket = socketIOClient.connect(host, {secure: true});
let sessionId = socket.sessionId;
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

//Receive welcome message from server
socket.on("hello", msg => {
    console.log(msg);
})

//Receive chat message from server
socket.on("broadcast", msg => {
    console.log("client received: ")
    console.log(msg);
    store.dispatch(newMessage(msg));
})


// const exampleMember = {
//     nickName: "jack",
//     pubKey: "sdz31412",
//     hostPubKey: "owaif1113o"
//   }

// Add host's public key here
export const createConversation = member => {
    socket.emit("createConversation", member);
}

/*
const message = {
  sender: {
            nickName: "tom",
            pubKey: "asdf131fasdf",
            hostPubkey: "owaif1113o"
           },
  plainText: "Hellow this is plaintext"
}
*/
export const joinConversation = member => {
    socket.emit("joinConversation", member);
}


export const sendMessage = message => {
    socket.emit('chatMessage', message);
}

export const endChat = () => {
    socket.disconnect();
}


/**
 * Send and receive messages
 * 
 * // Emit a message and wait for a reponse. Call this in an async action.
 * export const myFunction = callbackFunc => {
 *    socket.emit("message for the server", data);
 *    
 *    socket.on("message from the server", result => {
 *       callbackFunc(result);
 *    })
 * 
 * }
 * 
 * // Listen for a particular message
 * socket.on("message received", msg => {
 *    //do something
 * })
 */