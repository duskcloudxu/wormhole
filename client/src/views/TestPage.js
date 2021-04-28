import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  createConversation, endSession, initializeSocket,
  joinConversation,
  sendMessage,
  userExit
} from "../client";

const TestPage = props => {
  const [socket,setSocket] = useState(initializeSocket());

  const host = {
    nickName: "jack",
    pubKey: "owaif1113o",
  }

  const member = {
    nickName: "tom",
    pubKey: "asdf131fasdf",
    hostPubkey: "owaif1113o"
  }

  const guestMessage = {
    ciphertext:"Hello this is msg from guest",
    cipherPubKey:"owaif1113o"
  }

  const hostMessage = {
    ciphertext:"Hello this is msg from host",
    cipherPubKey:"asdf131fasdf"
  }
  return (
    <div>
      <button onClick={()=>createConversation(socket,host)}>CreateConversation</button>
      <button onClick={()=>joinConversation(socket,member)}>Join Conversation</button>
      <button onClick={()=>sendMessage(socket,guestMessage)}>send message as guest</button>
      <button onClick={()=>sendMessage(socket,hostMessage)}>send message as host</button>
      <button onClick={()=>userExit(socket)}>userExit</button>
      <button onClick={()=>endSession(socket)}>endSession</button>
    </div>
  );
};

TestPage.propTypes = {

};

export default TestPage;
