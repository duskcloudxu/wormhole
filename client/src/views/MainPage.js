import React from 'react'
import { useState } from 'react'
import {useWindowScroll} from '@react-hook/window-scroll'


import PropTypes from 'prop-types'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import {
  createConversationRedux,
  joinConversationRedux
} from '../redux/actions'
import FAQModal from '../components/FAQModal'

const MainPage = props => {
  const [hostNickname, setHostNickname] = useState('')
  const [invitationCode, setInvitationCode] = useState('')
  const [memberNickname, setMemberNickname] = useState('')
  const FAQ_MODAL_ID = "FAQ_MODAL_ID";
  const history = useHistory();
  const dispatch = useDispatch();
  const scrollY = useWindowScroll(10);
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const MOBILE_WIDTH = 768

  const clearForm = () => {
    setHostNickname('')
    setInvitationCode('')
    setMemberNickname('')
  }

  const submitHost = () => {
    dispatch(createConversationRedux(hostNickname));
    history.push("chat/host");
    clearForm()
  }

  const submitJoin = () => {
    dispatch(joinConversationRedux(memberNickname,invitationCode));
    history.push("chat/participant")
    clearForm()
  }


  const scrollStart = () => {
    if (windowWidth > MOBILE_WIDTH) {
      window.scrollTo(0, 900)
    } else {
      window.scroll(0, windowHeight * 1.2)
    }
  }

  const scrollJoin = () => {
    window.scrollTo(0, windowHeight * 2.4)
  }

  return (
    <div className="main" >
      <nav className={`navbar navbar-expand-lg navbar-light ${scrollY===0?"bg-transparent":"bg-dark"}`}>
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold title"
             href="#">Wormhole</a>
          <button className="btn fixed-right text-white fw-bold element"
                  data-bs-toggle="modal" data-bs-target={`#${FAQ_MODAL_ID}`}
             >FAQ and Tutorial</button>
        </div>
      </nav>
      <div className="introduction">
        <div className="container h-100">
          <div
            className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-12 align-self-end">
              <h1 className="title text-white font-weight-bold">Chatting
                safe.</h1>
            </div>
            <div className="col-lg-10 align-self-baseline">
              <p className="slogan text-white font-weight-light mb-5">gentlemen
                don't read each other's mail.</p>
              <div className="d-flex flex-wrap justify-content-center">
                <a className="page-button btn btn-xl m-2" onClick={scrollStart}>Start
                  Conversation</a>
                <a className="page-button btn btn-xl m-2 js-scroll-trigger"
                   onClick={scrollJoin}>Join Conversation</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-container-create">
        <div className="blockTitle text-center">
          <h1 className="font-weight-bold">Host conversation in encrypted
            mode</h1>
        </div>
        <div className="blockForm">
          <div className="blockLabelA">
            <h4 className="label">Nickname</h4>
          </div>
          <div className="blockInputA">
            <input type="text" className="form-control field" id="hostNickname"
                   placeholder="Enter your nickname"
                   onChange={e => setHostNickname(e.target.value)}
                   value={hostNickname}/>
          </div>
          <button type="submit" className="btn form-control blockButton"
                  onClick={e => submitHost()}>Host Conversation
          </button>
        </div>
        <div className="blockDescription">
          <div className="descriptionTitle">
            <h2>Host a conversation</h2>
          </div>
          <div className="descriptionSubtitle">
            <p className="subtitle">Start the Conversation as host, send your public
              key to your friend, and you can start!</p>
          </div>
          <div className="logoA"></div>
          <div className="logoB"></div>
          <div className="logoC"></div>
          <div className="logoTextA">
            <p><strong> RSA enrypted</strong></p>
          </div>
          <div className="logoTextB">
            <p><strong> Memory-stored credentials</strong></p>
          </div>
          <div className="logoTextC">
            <p><strong> All messages are burned when you end
              conversation</strong></p>
          </div>
        </div>
      </div>

      <div className="grid-container-join">
        <div className="blockTitle text-center">
          <h1 className="font-weight-bold">Join a conversation hosted by your
            friend</h1>
        </div>
        <div className="joinForm">
          <div className="blockLabelA">
            <h4 className="label">Invitation Code</h4>
          </div>
          <div className="blockInputA">
            <input type="text" className="form-control field"
                   id="invitationCode" placeholder="Enter your invitation code"
                   onChange={e => setInvitationCode(e.target.value)}
                   value={invitationCode}/>
          </div>
          <div className="blockLabelB">
            <h4 className="label">Nickname</h4>
          </div>
          <div className="blockInputB">
            <input type="text" className="form-control field"
                   id="memberNickname" placeholder="Enter your nickname"
                   onChange={e => setMemberNickname(e.target.value)}
                   value={memberNickname}/>
          </div>
          <button type="submit" className="btn form-control blockButton"
                  onClick={e => submitJoin()}>Join Conversation
          </button>
        </div>
        <div className="blockDescription">
          <div className="descriptionTitle">
            <h2>Join a conversation</h2>
          </div>
          <div className="descriptionSubtitle">
            <p className="subtitle">Got an invitation from your friend? Join the
              conversation with a click!</p>
          </div>
          <div className="logoA"></div>
          <div className="logoB"></div>
          <div className="logoD"></div>
          <div className="logoTextA">
            <p><strong> RSA enrypted</strong></p>
          </div>
          <div className="logoTextB">
            <p><strong> Memory-stored credentials</strong></p>
          </div>
          <div className="logoTextC">
            <p><strong> Save conversation to local environment</strong></p>
          </div>
        </div>
      </div>
      <FAQModal id={FAQ_MODAL_ID}/>
    </div>

  )
}

MainPage.propTypes = {}

export default MainPage
