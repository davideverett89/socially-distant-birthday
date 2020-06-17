import React from 'react';

import { Link } from 'react-router-dom';

import './Home.scss';

import COVID from '../../../images/597px-SARS-CoV-2_without_background.png';
import equalSign from '../../../images/203-2030608_equals-sign-equality-mathematics-symbol-clip-art-equal-sign-removebg-preview.png';
import cancelled from '../../../images/clipart-of-circle-with-line-across-1-removebg-preview.png';
import birthdayCake from '../../../images/1F382-birthday-cake-512.png';

class Home extends React.Component {
  render() {
    return (
        <div className="col-12 Home d-flex flex-column justify-content-around align-items-stretch">
            <h1 className="col-10 mt-5 mx-auto display-2 home-header">Has COVID-19 Ruined Your Friend's Birthday?</h1>
            <div className="my-5 big-image-container d-flex flex-row justify-content-center align-items-center">
              <img className="covid-image" src={COVID} alt="COVID rendering" />
              <img className="equal-image" src={equalSign} alt="equals sign" />
              <div className="little-image-container">
                <img className="cancelled-image" src={cancelled} alt="canclled" />
                <img className="cake-image" src={birthdayCake} alt="cake" />
              </div>
            </div>
            <p className="home-intro col-9 my-5 mx-auto lead">
              Don't let Quarantine get you down!  Use this tool to let your friends know you're thinking about them on their birthday!
              Create a birthday event, invite all your friends, and remind that special someone that their friends still exist and that life has meaning!
            </p>
            <Link className="my-5 mx-auto btn home-dash-btn" to="/dashboard">Go To Dashboard</Link>
        </div>
    );
  }
}

export default Home;
