import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  joinConversationRedux,
  sendMessageRedux,
  userExitRedux
} from '../redux/actions'
import FAQModal from '../components/FAQModal'
import { download } from '../utils/commonUtils'

const ChattingPageParticipant = props => {
  const dispatch = useDispatch()
  const nickName = useSelector(state => state.nickName)
  const messages = useSelector(state => state.messages)
  const hostPubKey = useSelector(state => state.hostPubKey)
  const [curMessage, setCurMessage] = useState('')
  if (!nickName) {
    return (
      <div>
        <div className="m-2 alert alert-danger">Please start from main page</div>
        <button className="m-2 btn btn-danger"
                onClick={() => {window.location.href = '#'}}>Back
        </button>
      </div>
    )
  }
  const handleSubmit = () => {
    dispatch(sendMessageRedux(curMessage, hostPubKey))
    setCurMessage('')
  }

  const handleSave = () => {
    download(JSON.stringify(messages[hostPubKey]))
  }

  const handleExit = () => {
    dispatch(userExitRedux())
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={'participant'}>
      <nav className="navbar navbar-light">
        <div className="d-flex p-2 align-items-center">
          <div className="d-flex align-items-center">
            <img src={process.env.PUBLIC_URL + '/hash.svg'}
                 className={'p-2 hashImg'} alt=""/>
            <a className="navbar-brand">Conversation Host</a>
          </div>
          <div className="flex-grow-1"/>
          <div className="d-flex align-items-center">
            <button type="button" className="btn m-2 btn-success"
                    onClick={handleSave}>Save
            </button>
            <button type="button" className="btn m-2 btn-danger"
                    onClick={handleExit}>Exit
            </button>
          </div>
          <button className="navbar-toggler" type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false"
                  aria-label="Toggle navigation">
          </button>
        </div>
      </nav>
      <div className="chattingContainer d-flex">
        <div className="chattingContent">
          <div className="messageBox ">
            {
              messages[hostPubKey].map(item => (
                <div className={`message m-3 ${item.type}`}>
                  <div className="date">
                    {`${item.date.toISOString()}, ${item.sender} said:`}
                  </div>
                  <div className="content">
                    {`${item.text}`}
                  </div>
                </div>
              ))
            }
          </div>
          <div className="msgInput d-flex ms-2 justify-content-center">
            <input type="text" className="form-control"
                   placeholder="Say something..."
                   value={curMessage}
                   onChange={e => setCurMessage(e.target.value)}
                   aria-label="Recipient's username"
                   onKeyPress={handleKeyPress}
                   aria-describedby="sendBtn"/>
            <button className="ms-2 sendBtn btn btn-outline-secondary"
                    type="button"
                    onClick={handleSubmit}
                    id="sendBtn">Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

ChattingPageParticipant.propTypes = {}

export default ChattingPageParticipant
