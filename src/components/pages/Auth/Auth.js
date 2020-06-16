import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

import birthdayCake from '../../../images/1F382-birthday-cake-512.png';

class Auth extends React.Component {
    loginClickEvent = (e) => {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
      console.error('Logged IN!');
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
