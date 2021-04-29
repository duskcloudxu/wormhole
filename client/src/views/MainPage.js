import React from 'react';
import {useState} from "react";

import PropTypes from 'prop-types';

const MainPage = props => {
  const [hostNickname, setHostNickname] = useState("");
  const [invitationCode, setInvitationCode] = useState("");
  const [memberNickname, setMemberNickname] = useState("");

  const submitCreation = () => {
    console.log("hostNickname: " + hostNickname);
    clearForm();
  }

  const submitJoin = () => {
    console.log("invitationCode: " + invitationCode);
    console.log("memberNickname: " + memberNickname);
    clearForm();
  }

  const clearForm = () => {
    setHostNickname("");
    setInvitationCode("");
    setMemberNickname("");
  }

  const scrollStart = () => {
    window.scrollTo(0, 700); 
  }

  const scrollJoin = () => {
    window.scrollTo(0, 1700); 
  }
  
  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold title" href="#">Wormhole</a>
          <a className="navbar-brand fixed-right text-white fw-bold element" href="#">FAQ and Tutorial</a>
        </div>
      </nav>
      <div className="introduction">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-12 align-self-end">
              <h1 className="title text-white font-weight-bold">Chatting safe.</h1>
            </div>
            <div className="col-lg-10 align-self-baseline">
              <p className="slogan text-white font-weight-light mb-5">gentlemen don't read each other's mail.</p>
              <a className="page-button btn btn-xl" onClick={scrollStart}>Start Conversation</a>
              <a className="divider"></a>
              <a className="page-button btn btn-xl js-scroll-trigger" onClick={scrollJoin}>Join Conversation</a>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-container-create">
        <div class="blockTitle text-center">
          <h1 className="font-weight-bold">Host conversation in encrypted mode</h1>
        </div>
        <div class="blockForm">
          <div class="blockLabelA">
            <h4 class="label">Nickname</h4>
          </div>
          <div class="blockInputA">
            <input type="text" className="form-control field" id="hostNickname" placeholder="Enter your nickname" onChange={e => setHostNickname(e.target.value)} value={hostNickname}></input>
          </div>
          <button type="submit" className="btn form-control blockButton" onClick={e => submitCreation()}>Host Conversation</button>     
        </div>
        <div class="blockDescription">
          <div class="descriptionTitle">
            <h2>Host a conversation</h2>
          </div>
          <div class="descriptionSubtitle">
            <p class="subtitle">Start the Conversation as host, send your public key to your friend,  and you can start!</p>
          </div>
          <div class="logoA"></div>
          <div class="logoB"></div>
          <div class="logoC"></div>
          <div class="logoTextA">
            <p><strong> RSA enrypted</strong></p>
          </div>
          <div class="logoTextB">
            <p><strong> Memory-stored credentials</strong></p>
          </div>
          <div class="logoTextC">
            <p><strong> All messages are burned when you end conversation</strong></p>
          </div>
        </div>
      </div>
      
      <div class="grid-container-join">
        <div class="blockTitle text-center">
          <h1 className="font-weight-bold">Join a conversation hosted by your friend</h1>
        </div>
        <div class="joinForm">
          <div class="blockLabelA">
            <h4 class="label">Invitation Code</h4>
          </div>
          <div class="blockInputA">
            <input type="text" className="form-control field" id="invitationCode" placeholder="Enter your invitation code" onChange={e => setInvitationCode(e.target.value)} value={invitationCode}></input>
          </div>
          <div class="blockLabelB">
            <h4 class="label">Nickname</h4>
          </div>
          <div class="blockInputB">
            <input type="text" className="form-control field" id="memberNickname" placeholder="Enter your nickname" onChange={e => setMemberNickname(e.target.value)} value={memberNickname}></input>
          </div>
          <button type="submit" className="btn form-control blockButton" onClick={e => submitJoin()}>Host Conversation</button>     
        </div>
        <div class="blockDescription">
          <div class="descriptionTitle">
            <h2>Join a conversation</h2>
          </div>
          <div class="descriptionSubtitle">
            <p class="subtitle">Got an invitation from your friend? Join the conversation with a click!</p>
          </div>
          <div class="logoA"></div>
          <div class="logoB"></div>
          <div class="logoD"></div>
          <div class="logoTextA">
            <p><strong> RSA enrypted</strong></p>
          </div>
          <div class="logoTextB">
            <p><strong> Memory-stored credentials</strong></p>
          </div>
          <div class="logoTextC">
            <p><strong> Save conversation to local environment</strong></p>
          </div>
        </div>
      </div>
    </div>

  );
};

MainPage.propTypes = {

};

export default MainPage;
