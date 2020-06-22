import React from 'react';

import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';
import birthdayData from '../../../helpers/data/birthdayData';
import userContributorData from '../../../helpers/data/userContributorData';

import './NewBirthday.scss';

class NewBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayGuestOfHonorUid: '',
    guestOfHonorName: '',
    users: [],
    invitees: [],
  }

  componentDidMount() {
    userData.getUsers()
      .then((_users) => {
        const users = [];
        _users.forEach((user) => {
          const thisUser = { isChecked: false, ...user };
          users.push(thisUser);
        });
        this.setState({ users });
      })
      .catch((err) => console.error('There was an issue getting all users:', err));
  }

  birthdayDateChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayDate: e.target.value });
  }

  birthdayGuestOfHonorUidChange = (e) => {
    const { userName } = e.target.dataset;
    this.setState({ birthdayGuestOfHonorUid: e.target.value, guestOfHonorName: userName });
    this.resetUsers();
  }

  updateInvitees = (finalUsers) => {
    const invitees = [];
    finalUsers.forEach((user) => {
      if (user.isChecked) {
        invitees.push(user.id);
      }
    });
    this.setState({ invitees });
  }

  resetUsers = () => {
    const { users } = this.state;
    const finalUsers = [];
    users.forEach((user) => {
      const newUser = { ...user };
      newUser.isChecked = false;
      finalUsers.push(newUser);
    });
    this.setState({ users: finalUsers }, this.updateInvitees(finalUsers));
  }

  userIsCheckedChange = (e) => {
    const { users } = this.state;
    const finalUsers = [];
    users.forEach((user) => {
      const newUser = { ...user };
      if (newUser.id === e.target.value) {
        newUser.isChecked = e.target.checked;
      }
      finalUsers.push(newUser);
    });
    this.setState({ users: finalUsers }, this.updateInvitees(finalUsers));
  }

  saveUserContributors = (birthdayId, invitees) => {
    invitees.forEach((userId) => {
      const newUserContributor = {
        birthdayId,
        userId,
      };
      userContributorData.postUserContributor(newUserContributor);
    });
  };

  saveBirthday = (e) => {
    e.preventDefault();
    const { birthdayDate, birthdayGuestOfHonorUid, invitees } = this.state;
    const newBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      guestOfHonorUid: birthdayGuestOfHonorUid,
    };
    birthdayData.postBirthday(newBirthday)
      .then((response) => {
        const newBirthdayId = response.data.name;
        this.saveUserContributors(newBirthdayId, invitees);
        this.props.history.push('/dashboard');
      })
      .catch((err) => console.error('Unable to create new birthday:', err));
  }

  render() {
    const {
      birthdayDate, birthdayGuestOfHonorUid, users, guestOfHonorName, invitees,
    } = this.state;
    const makeUserRadios = users.map((user, i) => {
      const isCurrentUser = user.uid === authData.getUid();
      if (isCurrentUser) return '';
      return (
        <div key={user.id} className="form-check">
          <input className="form-check-input" type="radio" name="userRadios" data-user-name={user.displayName} id={`userRadios${i + 1}`} value={user.uid} onChange={this.birthdayGuestOfHonorUidChange} checked={birthdayGuestOfHonorUid === user.uid} />
          <label className="form-check-label" htmlFor={`userRadios${i + 1}`}>{user.displayName}</label>
        </div>
      );
    });

    const makeUserCheckboxes = users.map((user, i) => {
      const isCurrentUserOrGOH = user.uid === authData.getUid() || user.uid === birthdayGuestOfHonorUid;
      if (isCurrentUserOrGOH) return '';
      return (
        <div key={user.id} className="form-check">
          <input className="form-check-input" type="checkbox" value={user.id} id={`userCheck${i + 1}`} onChange={this.userIsCheckedChange} checked={user.isChecked} />
          <label className="form-check-label" htmlFor={`userCheck${i + 1}`}>{user.displayName}</label>
      </div>
      );
    });

    const makeGuestList = invitees.map((user, i) => {
      const thisUser = users.find((x) => x.id === user);
      return (
        <li key={`invitation${i + 1}`} className="guest-list-item">{thisUser.displayName}</li>
      );
    });

    return (
        <div className="NewBirthday my-5">
            <h1>Create A New Birthday</h1>
            <form className="p-5 col-9 mx-auto my-5 new-birthday-form">
              <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="text-left col-6">
                      <h6>Whose birthday is it?</h6>
                      {makeUserRadios}
                    </div>
                    <div className="text-left col-6">
                      <h6>Who are you inviting?</h6>
                      {makeUserCheckboxes}
                    </div>
                  </div>
                  <div className="mt-5 col-9">
                    <div className="text-left m-auto date-picker">
                      <h6>When is it?</h6>
                      <label className="mx-2" htmlFor="start">Birthday date:</label>
                      <input type="date" id="start" name="trip-start"
                      value={birthdayDate}
                      min="1900-01-01" max="2020-12-31" onChange={this.birthdayDateChange} />
                    </div>
                  </div>
                </div>
                <div className="info-column col-6">
                  {/* This is all just a test */}
                    <h2 className="display-4">I am planning a Birthday Event for:</h2>
                    <h2 className="display-4">{guestOfHonorName}</h2>
                    {guestOfHonorName === '' ? '' : <h2 className="display-4">on</h2>}
                    <h2 className="display-4">{birthdayDate}</h2>
                    <h2>Guests Invited:</h2>
                    <ul className="guest-list col-6 mx-auto list-group list-group-flush">
                      {makeGuestList}
                    </ul>
                </div>
              </div>
              <button className="my-4 btn birthday-save-btn" onClick={this.saveBirthday}>Save Birthday</button>
            </form>
        </div>
    );
  }
}

export default NewBirthday;
