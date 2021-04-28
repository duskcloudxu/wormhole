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
                        <h1 className="title text-white font-weight-bold">Chatting Safe</h1>
                    </div>
                    <div className="col-lg-10 align-self-baseline">
                        <p className="slogan text-white font-weight-light mb-5">Gentlemen don't read each other's mail</p>
                        <a className="page-button btn btn-xl" href="#startBlock">Start Conversation</a>
                        <a className="divider"></a>
                        <a className="page-button btn btn-xl js-scroll-trigger" href="#member-block">Join Conversation</a>
                    </div>
                </div>
            </div>
      </div>

      <div className="page-block container" id="startSection">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-lg-12 align-self-end text-center">
              <h1 className="font-weight-bold">Host conversation in encrypted mode</h1>
          </div>
          <div className="row">
            <div className="page-card card col-lg-6">
              <div className="card-body">
                <h4 id="startBlock" className="card-subtitle mb-2 text-muted">Nickname</h4>
                  <div className="element">
                  <input type="text" className="form-control" id="hostNicknameEntry" placeholder="Enter host's nickname" onChange={e => setHostNickname(e.target.value)} value={hostNickname}></input>
                  </div>
                <button type="submit" className="btn page-button form-control" onClick={e => submitCreation()}>Host Conversation</button>
              </div>
            </div>
            <div className="page-card-invisible card col-lg-6">
              <div className="card-body">
                <h3 className="card-title">Join a conversation</h3>
                <h6 className="card-subtitle mb-2 text-muted">Got an invitation from your friend? Join the conversation with a click!</h6>       
                <p><strong> RSA enrypted</strong></p>
                <p><strong> Memory-stored credentials</strong></p>
                <p><strong> Save conversation to local environment</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-block container">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-lg-12 align-self-end text-center">
              <h1 className="font-weight-bold">Join conversation hosted by your friend</h1>
          </div>
          <div className="row">
            <div className="page-card-large card col-lg-6">

              <div className="card-body">
                <h4 className="card-subtitle mb-2 text-muted">Invitation Code</h4>
                  <div className="element">
                  <input type="text" className="form-control" id="invitationCode" placeholder="Enter invitation code" onChange={e => setInvitationCode(e.target.value)} value={invitationCode}></input>
                  </div>

                <h4 className="card-subtitle mb-2 text-muted">Nickname</h4>
                <div className="element">
                <input type="text" className="form-control" id="memberNickname" placeholder="Enter your nickname" onChange={e => setMemberNickname(e.target.value)} value={memberNickname}></input>
                </div>
                <button type="submit" className="btn page-button form-control" onClick={e => submitJoin()}>Join Conversation</button>

                
              </div>


            </div>
            <div className="page-card-invisible card col-lg-6">
              <div className="card-body">
                <h3 className="card-title">Host a conversation</h3>
                <h6 className="card-subtitle mb-2 text-muted">Start the Conversation as host, send your public key to your friend,  and you can start!</h6>       
                <p><strong> RSA enrypted</strong></p>
                <p><strong> Memory-stored credentials</strong></p>
                <p><strong> All messages are burned when you end conversation</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      


    </div>
  );
};

MainPage.propTypes = {

};

export default MainPage;
