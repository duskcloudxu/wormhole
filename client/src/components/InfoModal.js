import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const InfoModal = props => {
  const publicKey = useSelector(state=>state.pubKey);
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
              Copy and Paste text below to invite your friend!
            </div>
            <div className="bg-light my-text-break">
              {publicKey}
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

InfoModal.propTypes = {
  id:PropTypes.string

}

export default InfoModal
