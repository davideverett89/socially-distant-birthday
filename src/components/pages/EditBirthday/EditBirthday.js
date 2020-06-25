import React from 'react';

import smash from '../../../helpers/data/smash';
import birthdayData from '../../../helpers/data/birthdayData';
import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';

import './EditBirthday.scss';
import userContributorData from '../../../helpers/data/userContributorData';

class EditBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayGuestOfHonorUid: '',
    guestOfHonorName: '',
    users: [],
    invitations: [],
    newInvitees: [],
  }

  getBirthdayInfo = () => {
    const { birthdayId } = this.props.match.params;
    smash.getSingleBirthdayWithGuestOfHonorAndInvitations(birthdayId)
      .then((birthday) => {
        userData.getUsers().then((users) => {
          const finalUsers = [];
          users.forEach((user) => {
            const thisUser = { isChecked: false, ...user };
            finalUsers.push(thisUser);
          });
          this.setState({
            birthdayDate: birthday.date,
            birthdayGuestOfHonorUid: birthday.guestOfHonorUid,
            guestOfHonorName: birthday.guestOfHonor,
            users: finalUsers,
            invitations: birthday.invitations,
          });
        });
      })
      .catch((err) => console.error('There was an issue with getting this birthday:', err));
  }

  componentDidMount() {
    this.getBirthdayInfo();
  }

  birthdayDateChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayDate: e.target.value });
  }

  birthdayGuestOfHonorUidChange = (e) => {
    const { userName } = e.target.dataset;
    this.setState({ birthdayGuestOfHonorUid: e.target.value, guestOfHonorName: userName });
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

  updateInvitees = (finalUsers) => {
    const invitees = [];
    finalUsers.forEach((user) => {
      if (user.isChecked) {
        invitees.push(user.id);
      }
    });
    this.setState({ newInvitees: invitees });
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

  removeUserContributor = (userContributorId) => {
    const { birthdayId } = this.props.match.params;
    userContributorData.deleteUserContributor(userContributorId)
      .then(() => {
        smash.getSingleBirthdayWithGuestOfHonorAndInvitations(birthdayId)
          .then((birthday) => {
            this.setState({ invitations: birthday.invitations });
          });
      })
      .catch((err) => console.error('There was an issue with deleting this userContributor:', err));
  }

  updateBirthday = (e) => {
    e.preventDefault();
    const { birthdayId } = this.props.match.params;
    const { birthdayDate, birthdayGuestOfHonorUid, newInvitees } = this.state;
    const updatedBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      guestOfHonorUid: birthdayGuestOfHonorUid,
    };
    birthdayData.putBirthday(birthdayId, updatedBirthday)
      .then(() => {
        this.saveUserContributors(birthdayId, newInvitees);
        this.props.history.push('/dashboard');
      })
      .catch((err) => console.error('Unable to create new birthday:', err));
  }

  render() {
    const {
      birthdayDate, birthdayGuestOfHonorUid, users, guestOfHonorName, invitations, newInvitees,
    } = this.state;

    const makeUserCheckboxes = users.map((user, i) => {
      const isUserAlreadyInvited = invitations.find((x) => x.userId === user.id) !== undefined;
      const isCurrentUserOrGOH = user.uid === authData.getUid() || user.uid === birthdayGuestOfHonorUid;
      if (isCurrentUserOrGOH || isUserAlreadyInvited) return null;
      return (
        <div key={user.id} className="form-check">
          <input className="form-check-input" type="checkbox" value={user.id} id={`userCheck${i + 1}`} onChange={this.userIsCheckedChange} checked={user.isChecked} />
          <label className="form-check-label" htmlFor={`userCheck${i + 1}`}>{user.displayName}</label>
        </div>
      );
    });

    const buildInviations = invitations.map((invitation) => (
      <li key={invitation.id} className="guest-list-item">{invitation.invitedUserName}<button className="btn" onClick={(e) => { e.preventDefault(); this.removeUserContributor(invitation.id); }}>&#215;</button></li>
    ));

    const makeGuestList = newInvitees.map((user, i) => {
      const thisUser = users.find((x) => x.id === user);
      return (
        <li key={`invitation${i + 1}`} className="guest-list-item">{thisUser.displayName}</li>
      );
    });

    return (
        <div className="EditBirthday my-5">
            <h1 className="edit-birthday-header display-3">Edit Birthday</h1>
            <form className="p-5 col-10 mx-auto my-5 edit-birthday-form">
              <div className="row">
                <div className="col-6">
                  <div className="p-5 mx-1 selection-column row">
                    <div className="p-5 text-left col-12">
                      <h6>{makeUserCheckboxes.every((x) => x === null) ? '' : 'Who else would you like to invite?'}</h6>
                      {makeUserCheckboxes}
                    </div>
                    <div className="mt-5 mx-auto col-9">
                      <div className="text-left m-auto date-picker">
                        <h6>Would you like to change the date?</h6>
                        <label className="mx-2" htmlFor="start">Birthday date:</label>
                        <input type="date" id="start" name="trip-start"
                        value={birthdayDate}
                        min="1900-01-01" max="2020-12-31" onChange={this.birthdayDateChange} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="info-column p-5 mx-1 d-flex flex-column justify-content-around align-items-center">
                    <h2 className="display-4">This Birthday Event is for:</h2>
                    <h2 className="guest-of-honor-name">{guestOfHonorName}</h2>
                    <h4 className="on">on</h4>
                    <h2 className="birthday-date">{birthdayDate}</h2>
                    <div className="row">
                      <div className="col-6">
                        <h3 className="my-2 already-invited-header">Guests Already Invited:</h3>
                        <ul className="p-3 guest-list mx-auto list-group list-group-flush">
                          {buildInviations}
                        </ul>
                      </div>
                      <div className="col-6">
                        <h3 className="my-2 guest-invited-header">New Invited Guests:</h3>
                        <ul className="p-3 guest-list mx-auto list-group list-group-flush">
                          {makeGuestList}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-5 col-4 btn birthday-edit-btn" onClick={this.updateBirthday}>Update Birthday</button>
            </form>
        </div>
    );
  }
}

export default EditBirthday;
