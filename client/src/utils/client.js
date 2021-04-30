import {SOCKET_HOST} from "./envConstants";
import { useDispatch } from 'react-redux'
import store from '../redux/store'
import {
  errorRedux,
  joinMessageRedux, leaveMessageRedux,
  receiveMessageRedux, userExitedRedux
} from '../redux/actions'
/** CLIENT CONFIGURATION - connect to the server */
const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server

// Checks which host we're connected to (for troubleshooting);


export const initializeSocket = ()=>{
  //Receive welcome message from server

  let socket = socketIOClient.connect(SOCKET_HOST, {secure: true});
  socket.on("hello", msg => {
    console.log(msg);
    console.log(`connected to ${SOCKET_HOST} with session id ${socket.id}`);
  })

  socket.on("receiveMessage", msg => {
    store.dispatch(receiveMessageRedux(msg));
  })

  socket.on("error", res => {
    store.dispatch(errorRedux(res.msg))
    console.log("error"+res);
  })

  socket.on("joinMessage", msg => {
    console.log("people joined",msg);
    store.dispatch(joinMessageRedux(msg))
  })

  socket.on("leaveMessage", msg => {
    console.log("people leave",msg);
    store.dispatch(leaveMessageRedux(msg));
  })

  socket.on("endSession", msg => {
    store.dispatch(userExitedRedux());
  })

  socket.on("disconnect", msg => {
    console.log(msg)
  })

  socket.on("pong",msg=>{
    console.log(msg);
  })

  return socket;
}


// const exampleMember = {
//     nickName: "jack",
//     pubKey: "sdz31412",
//     hostPubKey: "owaif1113o"
//   }

// Add host's public key here
export const createConversation = (socket,member) => {
  console.log("creatConversation triggered")
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
export const joinConversation = (socket,member) => {
  socket.emit("joinConversation", member);
}

export const sendMessage = (socket,message) => {
  console.log(message)
  socket.emit('sendMessage', message);
}

export const userExit = (socket) => {
  socket.emit('userExit');
}

export const endSession = (socket) => {
  socket.emit('endSession');
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
