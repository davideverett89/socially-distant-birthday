import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import authData from '../../../helpers/data/authData';
import userData from '../../../helpers/data/userData';

import './Auth.scss';
import birthdayCake from '../../../images/1F382-birthday-cake-512.png';

class Auth extends React.Component {
  saveUser = () => {
    const newUser = {
      displayName: authData.getDisplayName(),
      email: authData.getEmail(),
      uid: authData.getUid(),
    };
    userData.postUser(newUser)
      .then((user) => { const userId = user.data; console.log('A user was created!:', userId); })
      .catch((err) => console.error('There was an issue with registering new user:', err));
  }

    userCheck = () => {
      userData.getUserByEmail(authData.getEmail())
        .then((thisUser) => {
          if (thisUser.length === 0) {
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
            <h1 className="my-2 col-12 display-1 auth-header">Socially Distant Birthday</h1>
            <img className="my-5 col-12 auth-image" src={birthdayCake} alt="cake" />
            <h2 className="my-2 display-4 auth-header">Please Sign In</h2>
            <button className="my-5 btn login-btn" onClick={this.loginClickEvent}>Login</button>
        </div>
      );
    }
}

export default Auth;
