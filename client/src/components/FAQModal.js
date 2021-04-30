import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { joinConversationRedux } from '../redux/actions'

const FAQModal = props => {
  return (
    <div className="modal fade" id={props.id} tabIndex="-1"
         aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"/>
          </div>
          <div className="modal-body modal-dialog modal-dialog-scrollable">
            <div className="alert alert-success">
              Welcome to wormhole, a web-based encrypted chatting tool
            </div>
            <div className="alert alert-info">
              You can host a conversation and invite your friend to communicate
              safely!
            </div>
            <div className="alert alert-info">
              When you receive invitation code from your friend, you can join
              them!
            </div>
            <h3>Common Q&A</h3>
            <div className="bg-light m-2 p-2 my-text-break">
              - What Service do we provide?
              <br/>
              <br/>
              We provide 1 on 1 encrypted online chatting service, you could
              start a conversation with anyone having your encrypted key, and
              the conversation is totally encrypted.


            </div>
            <div className="bg-light m-2 p-2 my-text-break">
              - Do we collect user information?
              <br/>
              <br/>
              No, we only collect hash value of your public key, you should
              choose a secure (or insecure) channel to send your public key,
              anyone with that key could communicate with you in secured
              chatting, and they are not visible to each other.
            </div>

            <div className="bg-light m-2 p-2 my-text-break">
              - How can I get back my chatting history?
              <br/>
              <br/>

              When a session is active, you could download all your chatting
              history in your local. However, once someone retrieved their
              message or the host end their session, there is no way get those
              history back. There's the trade-off between security and
              convenience.
            </div>
            <div className="bg-light m-2 p-2 my-text-break">
              - Is there any possibility of being wiretapped?
              <br/>
              <br/>

              Wiretapping is hard to achieve unless your local environment are
              totally compromised to the adversary, but in that case, there are
              more things besides our website to worry about.
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal">Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

FAQModal.propTypes = {
  id: PropTypes.string
}

export default FAQModal
