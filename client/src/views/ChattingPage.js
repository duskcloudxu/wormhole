import React from 'react'
import PropTypes from 'prop-types'
import keypair from 'keypair'
import nodeRSA from 'node-rsa'
import {
  Switch,
  Route,
  Link, useRouteMatch
} from 'react-router-dom'
import ChattingPageHost from './ChattingPageHost'
import ChattingPageParticipant from './ChattingPageParticipant'

const ChattingPage = props => {
  const match = useRouteMatch()
  return (
    <div className={"chatting"}>
      <Route path={`${match.url}/host`}>
        <ChattingPageHost/>
      </Route>
      <Route path={`${match.url}/participant`}>
        <ChattingPageParticipant/>
      </Route>
    </div>
  )
}

ChattingPage.propTypes = {}

export default ChattingPage
