import React from 'react';
import './App.scss';

import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/pages/Auth/Auth';
import Dashboard from '../components/pages/Dashboard/Dashboard';
import EditBirthday from '../components/pages/EditBirthday/EditBirthday';
import EditToast from '../components/pages/EditToast/EditToast';
import Home from '../components/pages/Home/Home';
import NewBirthday from '../components/pages/NewBirthday/NewBirthday';
import NewToast from '../components/pages/NewToast/NewToast';
import SingleBirthday from '../components/pages/SingleBirthday/SingleBirthday';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import fbConnection from '../helpers/data/connection';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Auth />
        <Dashboard />
        <EditBirthday />
        <EditToast />
        <Home />
        <NewBirthday />
        <NewToast />
        <SingleBirthday />
      </div>
    );
  }
}

export default App;
