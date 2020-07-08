import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import authData from '../../../helpers/data/authData';
import userData from '../../../helpers/data/userData';

import './Auth.scss';

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

  updateUser = (userId) => {
    const updatedDisplayName = authData.getDisplayName();
    const updatedUid = authData.getUid();
    userData.patchUser(userId, updatedDisplayName, updatedUid)
      .then(() => {})
      .catch((err) => console.error('There was an issue with updating a user:', err));
  }

  userCheck = () => {
    userData.getUserByEmail(authData.getEmail())
      .then((thisUser) => {
        if (thisUser.length === 0) {
          this.saveUser();
        } else {
          const isInvitedUser = thisUser[0].uid === '';
          if (isInvitedUser) {
            this.updateUser(thisUser[0].id);
          }
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
        <div className="Auth mx-auto col-12 col-sm-10 col-md-10 col-lg-9 col-xl-9">
            <div className="my-5 auth-flex d-flex flex-column justify-content-center align-items-center">
              <h1 className="m-1 display-1 brand-header">Welcome To Apparty!</h1>
              <i className="my-5 auth-image fas fa-people-arrows fa-10x"></i>
              <h2 className="my-2 auth-header">Please Sign In</h2>
              <button className="col-4 my-5 btn login-btn" onClick={this.loginClickEvent}>Login</button>
            </div>
        </div>
      );
    }
}

export default Auth;
