import { } from "../redux/actions";
import {joinConversation, createConversation, sendMessage, endChat} from "../client";
import { useState, useEffect } from 'react';
import Form from "../components/Form";
import Messages from "../components/Messages";

const host = {
  nickName: "jack",
  pubKey: "owaif1113o",
  hostPubkey: "owaif1113o"
}

const member = {
  nickName: "tom",
  pubKey: "asdf131fasdf",
  hostPubkey: "owaif1113o"
}

const message = {
  sender: {
            nickName: "tom",
            pubKey: "asdf131fasdf",
            hostPubkey: "owaif1113o"
           },
  plainText: "Hellow this is plaintext"
}



const App = () => {
  //Remove this at the end, this is for testing only
  useEffect(() => {
    createConversation(host)
    joinConversation(member);
    sendMessage(message);
    //endChat();
  }, []);

  return (
    <div class="container">
      <Messages />
      <Form />
    </div>

  )
}

export default App;
