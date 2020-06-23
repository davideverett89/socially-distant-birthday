import React from 'react';
import PropTypes from 'prop-types';

import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import firebase from 'firebase/app';
import 'firebase/auth';

import balloon from '../../../images/Purple-Balloon-P.png';
import exclamation from '../../../images/exclamation-point.png';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
    static propTypes = {
      authed: PropTypes.bool.isRequired,
    }

    state = {
      isOpen: false,
    }

    toggle = () => {
      this.setState({ isOpen: !this.state.isOpen });
    }

    logMeOut = (e) => {
      e.preventDefault();
      firebase.auth().signOut();
    }

    render() {
      const { isOpen } = this.state;
      const { authed } = this.props;

      const buildNavLinks = () => {
        if (authed) {
          return (
            <Nav className="ml-auto" navbar>
              <NavItem className="mx-2">
                <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink tag={RRNavLink} to='/dashboard'>Dashboard</NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink tag={RRNavLink} to='/birthdays/new'>New Birthday</NavLink>
              </NavItem>
              <NavItem className="mx-2">
                <NavLink className="btn logout-btn" onClick={this.logMeOut}>Logout</NavLink>
              </NavItem>
            </Nav>
          );
        }
        return <Nav className="ml-auto" navbar></Nav>;
      };

      return (
        <div className="MyNavbar">
          <Navbar className="nav-container" light expand="md">
            <NavbarBrand href="/">
              <img className="balloon-logo" src={balloon} alt="balloon" />
              <img className="exclamation" src={exclamation} alt="exclamation" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={isOpen} navbar>
              {buildNavLinks()}
            </Collapse>
          </Navbar>
        </div>
      );
    }
}

export default MyNavbar;
