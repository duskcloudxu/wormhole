import React from 'react';
import PropTypes from 'prop-types';

const MainPage = props => {
  return (
    <div className="main">
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold title" href="#">Wormhole</a>
        </div>
      </nav>
    </div>
  );
};

MainPage.propTypes = {

};

export default MainPage;
