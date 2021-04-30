import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  createConversationRedux,
  endSessionRedux,
  sendMessageRedux
} from '../redux/actions'
import InfoModal from '../components/InfoModal'
import { sendMessage } from '../utils/client'
import { download } from '../utils/commonUtils'

const ChattingPageHost = props => {
  const dispatch = useDispatch()
  const nickName = useSelector(state => state.nickName)
  const messages = useSelector(state => state.messages)
  const currentMembers = useSelector(state => state.currentMembers)
  const [showSidebar, setShowSidebar] = useState(false)
  const [curMessage, setCurMessage] = useState('')
  const INFO_MODAL_ID = 'INFO_MODAL'
  const [currentConversation, setCurrentConversation] = useState('public')
  if(messages[currentConversation] === undefined){
    setCurrentConversation("public");
    return (<div>LOADING....</div>)
  }
  if (!nickName) {
    dispatch(createConversationRedux('testHost'))
    return <div>LOADING....</div>
  }
  const hideSidebar = ()=>{
    setShowSidebar(false);
  }
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  const handleSubmit = () => {
    if (currentConversation !== 'public') {
      dispatch(sendMessageRedux(curMessage, currentConversation))
      setCurMessage('')
    }
  }

  const handleSave = ()=>{
    download(JSON.stringify(messages[currentConversation]));
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit()
      hideSidebar()
    }
  }

  const handleEndSession=()=>{
    dispatch(endSessionRedux());
  }

  return (
    <div className={'host'}>
      <nav className="navbar navbar-light">
        <div className="d-flex p-2 flex-wrap align-items-center">
          <div className="d-flex align-items-center">
            <img src={process.env.PUBLIC_URL + '/hash.svg'}
                 className={'p-2 hashImg'} alt=""/>
            <a className="navbar-brand">Channel Message</a>
          </div>
          <div className="d-flex align-items-center">
            <button type="button" className="btn m-2 btn-success" onClick={handleSave}>Save</button>
            <button type="button" className="btn m-2 btn-info text-white"
                    data-bs-toggle="modal"
                    data-bs-target={'#' + INFO_MODAL_ID}>Invite
            </button>
            <button type="button" className="btn m-2 btn-danger" onClick={handleEndSession}>End Session
            </button>
          </div>
        </div>
      </nav>
      <div className="chattingContainer d-flex">
        <div className="chattingContent" onClick={()=>hideSidebar()}>
          <div className="messageBox ">
            {
              messages[currentConversation].map(item => (
                <div className={`message m-3 ${item.type}`}>
                  <div className="date">
                    {`${item.date.toISOString()}, ${item.sender} said:`}
                  </div>
                  <div className="content">
                    {`${item.text}`}
                  </div>
                </div>
              ))
            }</div>
          {currentConversation !== 'public' && (
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
          )}
        </div>
        <div className={`currentMember ${showSidebar ? 'currentMember_translate'
          : ''}`}>

          <div className="list-group">
            <button type="button"
                    className={`list-group-item list-group-item-action myBtn ${currentConversation
                    === 'public' ? 'active' : ''}`}
                    onClick={() => setCurrentConversation('public')}
            >
              public
            </button>
            {currentMembers.map((item, i) => (
              <button type="button"
                      key={i}
                      className={`list-group-item list-group-item-action myBtn ${currentConversation
                      === item.nickName ? 'active' : ''}`}
                      onClick={() => setCurrentConversation(item.pubKey)}
              >
                {item.nickName}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="widget">
        <button onClick={toggleSidebar}>
          <img src={process.env.PUBLIC_URL + '/human.svg'} alt=""/>
        </button>
      </div>

      <InfoModal id={INFO_MODAL_ID}/>
    </div>
  )
}

ChattingPageHost.propTypes = {}

export default ChattingPageHost
