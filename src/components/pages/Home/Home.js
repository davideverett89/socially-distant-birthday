import React from 'react';

import { Link } from 'react-router-dom';

import './Home.scss';

class Home extends React.Component {
  render() {
    return (
      <div className="Home col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 mx-auto">
        <div className="p-3 home-flex my-5 d-flex flex-column justify-content-center align-items-center">
          <h1 className="home-header display-1">Welcome To Apparty!</h1>
          <div className="my-5 big-image-container container-fluid">
            <i className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-2 cake-image fas fa-birthday-cake fa-5x"></i>
            <i className="my-5 col-12 col-sm-3 col-md-3 col-lg-3 col-xl-2 people-image fas fa-people-arrows fa-7x"></i>
            <i className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-2 cake-image fas img-fluid fa-birthday-cake fa-5x"></i>
          </div>
          <p className="home-intro col-12 my-3 mx-auto">
            A socially distant birthday tracking and celebration app!
          </p>
          <Link className="col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 my-5 btn home-dash-btn" to="/dashboard">Dashboard</Link>
        </div>
      </div>
    );
  }
}

export default Home;
