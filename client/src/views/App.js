import React from 'react';
import { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import TestPage from "./TestPage";
import ChattingPage from "./ChattingPage";
import MainPage from "./MainPage";
import { encryption ,decryption } from '../utils/rsa'
import EndModal from '../components/EndModal'




const App = () => {
  window.encryption = encryption;
  window.decryption = decryption;
  return (
    <Router>
      <Switch>
        <Route path={"/test"}>
          <TestPage/>
        </Route>
        <Route path={"/chat"}>
          <ChattingPage/>
        </Route>
        <Route path={"/"} exact>
          <MainPage/>
        </Route>
      </Switch>
      <EndModal/>
    </Router>
  )
}

export default App;
