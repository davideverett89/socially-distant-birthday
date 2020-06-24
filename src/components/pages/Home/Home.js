import React from 'react';

import { Link } from 'react-router-dom';

import './Home.scss';

import COVID from '../../../images/597px-SARS-CoV-2_without_background.png';
import cancelled from '../../../images/clipart-of-circle-with-line-across-1-removebg-preview.png';
import birthdayCake from '../../../images/1F382-birthday-cake-512.png';

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <div className="p-3 home-flex my-5 col-6 mx-auto d-flex flex-column justify-content-center align-items-center">
          <h1 className="home-header display-1">Welcome To Aparty!</h1>
          <div className="my-5 big-image-container d-flex flex-row justify-content-between align-items-center">
            <img className="covid-image" src={COVID} alt="COVID rendering" />
            <img className="mx-3 equal-image" src='https://i.ya-webdesign.com/images/does-not-equal-sign-png-4.png' alt="equals sign" />
            <div className="little-image-container">
              <img className="cancelled-image" src={cancelled} alt="canclled" />
              <img className="cake-image" src={birthdayCake} alt="cake" />
            </div>
          </div>
          <p className="home-intro col-12 my-5 mx-auto lead">
            Don't let quarantine get you down!  Use this tool to let your friends know you're thinking about them on their birthday!
            Create a birthday event, invite all your friends, and remind that special someone that their friends still exist and that life has meaning!
          </p>
          <Link className="my-5 btn home-dash-btn" to="/dashboard">Go To Dashboard</Link>
        </div>
      </div>
    );
  }
}

export default Home;
