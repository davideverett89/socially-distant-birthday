import React from 'react';

import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="p-3 home-flex my-5 col-9 mx-auto d-flex flex-column justify-content-center align-items-center">
          <h1 className="home-header display-1">Welcome To Apparty!</h1>
          <div className="my-5 big-image-container d-flex flex-row justify-content-between align-items-center">
            <i className="covid-image fas fa-virus fa-10x"></i>
            <i className="not-equal-image mx-5 fas fa-not-equal fa-7x"></i>
            <div className="little-image-container">
              <i className="cancelled-image fas fa-ban fa-7x"></i>
              <i className="cake-image fas fa-birthday-cake fa-10x"></i>
            </div>
          </div>
          <p className="home-intro col-12 my-5 mx-auto lead">
            A socially distant birthday tracking and celebration app!  Remind that special someone that their friends still exist and that life has meaning!
          </p>
          <Link className="my-5 btn home-dash-btn" to="/dashboard">Go To Dashboard</Link>
        </div>
      </div>
    );
  }
}

export default Home;
