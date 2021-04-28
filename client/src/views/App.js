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




const App = () => {

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
    </Router>
  )
}

export default App;
