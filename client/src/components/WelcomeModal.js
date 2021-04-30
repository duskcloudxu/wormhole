import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { joinConversationRedux } from '../redux/actions'

const WelcomeModal = props => {
  const [code, setCode] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(joinConversationRedux('testUser', code))
  }
  return (
    <div>
      <div className="alert alert-success">
        Please Provide Invitation Code
      </div>
      <div className="form-floating">
              <textarea className="form-control"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste Invitation code here"
                        id="floatingTextarea"/>
        <label htmlFor="floatingTextarea">InvitationCode</label>

      </div>

      <button type="button" className="btn btn-primary"
              onClick={handleSubmit}
      >
        submit
      </button>
    </div>

  )
}

WelcomeModal.propTypes = {
  id: PropTypes.string
}

export default WelcomeModal
