import React, { useEffect } from 'react'
import { Modal } from 'bootstrap'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { download } from '../utils/commonUtils'
import { addModalRedux } from '../redux/actions'

const EndModal = props => {
  const MODAL_ID = 'endModal'
  const messages = useSelector(state => state.messages);
  const hint = useSelector(state=>state.endModalHint);
  const dispatch = useDispatch()
  let myModal = undefined
  const handleSave = () => {
    download(JSON.stringify(messages))
  }
  const handleClose = () => {
    window.location.href = '#'
    hideModal()
  }
  useEffect(() => {
    if (!myModal) {
      myModal = new Modal(document.getElementById(MODAL_ID),
        { backdrop: false, keyboard: false })
      dispatch(addModalRedux(myModal))
    }
    window.modal = myModal
  })
  const showModal = () => {
    myModal.show()
  }
  const hideModal = () => {
    myModal._isShown = true
    myModal.hide()
  }
  return (
    <div>
      <div className="modal loadingModal" id={MODAL_ID}
           data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
           aria-labelledby="label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="label">Page Loading</h5>
            </div>
            <div
              className=" m-5 modal-body d-flex align-items-center justify-content-center">
              {hint}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn m-2 btn-success"
                      onClick={handleSave}>Save
              </button>
              <button type="button" className="btn m-2 btn-danger"
                      onClick={handleClose}>Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

EndModal.propTypes = {}

export default EndModal
