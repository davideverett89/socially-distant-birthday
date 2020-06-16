import React from 'react';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

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

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

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
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar />
              <Switch>
                <PrivateRoute path='/home' component={Home} authed={authed} />
                <PrivateRoute path='/dashboard' component={Dashboard} authed={authed} />
                <PrivateRoute path='/birthdays/edit/:birthdayId' component={EditBirthday} authed={authed} />
                <PrivateRoute path='/toasts/edit/:toastId' component={EditToast} authed={authed} />
                <PrivateRoute path='/birthdays/new' component={NewBirthday} authed={authed} />
                <PrivateRoute path='/toasts/new' component={NewToast} authed={authed} />
                <PrivateRoute path='/birthdays/:birthdayId' component={SingleBirthday} authed={authed} />
                <PublicRoute path='/auth' component={Auth} authed={authed} />
                <Redirect from="*" to="/home"/>
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
