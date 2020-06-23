import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import authData from '../../../helpers/data/authData';
import userData from '../../../helpers/data/userData';

import './Auth.scss';
import birthdayCake from '../../../images/1F382-birthday-cake-512.png';
import decorations from '../../../images/Purple-Balloon-N.png';

class Auth extends React.Component {
  saveUser = () => {
    const newUser = {
      displayName: authData.getDisplayName(),
      email: authData.getEmail(),
      uid: authData.getUid(),
    };
    userData.postUser(newUser)
      .then(() => {})
      .catch((err) => console.error('There was an issue with registering new user:', err));
  }

    userCheck = () => {
      userData.getUserByEmail(authData.getEmail())
        .then((thisUser) => {
          if (thisUser.length === 0) {
            // If a user is pulled back, check if there is uid is blank, if it is blank, then update the uid and displayName. Add else statement.
            this.saveUser();
          }
        })
        .catch((err) => console.error('There was an issue checking for a user at login:', err));
    }

    loginClickEvent = (e) => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(() => {
          this.userCheck();
        })
        .catch((err) => console.error('There was an issue with logging in:', err));
    }

    render() {
      return (
        <div className="Auth d-flex flex-column align-items-center justify-content-between">
            <img className="decorations" src={decorations} alt="decorations" />
            <img className="my-5 col-12 auth-image" src={birthdayCake} alt="cake" />
            <h2 className="my-2 display-4 auth-header">Please Sign In</h2>
            <button className="my-5 btn login-btn" onClick={this.loginClickEvent}>Login</button>
        </div>
      );
    }
}

export default Auth;
