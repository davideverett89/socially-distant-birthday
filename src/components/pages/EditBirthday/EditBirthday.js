import React from 'react';

import smash from '../../../helpers/data/smash';
import birthdayData from '../../../helpers/data/birthdayData';
import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';

import UserCheckboxGroup from '../../shared/UserCheckboxGroup/UserCheckboxGroup';
import DatePicker from '../../shared/DatePicker/DatePicker';
import NewUserForm from '../../shared/NewUserForm/NewUserForm';

import './EditBirthday.scss';
import userContributorData from '../../../helpers/data/userContributorData';

class EditBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayGuestOfHonorId: '',
    guestOfHonorName: '',
    newUserEmail: '',
    newUserName: '',
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
            birthdayGuestOfHonorId: birthday.guestOfHonorId,
            guestOfHonorName: birthday.guestOfHonor,
            users: finalUsers,
            invitations: birthday.invitations,
            newUserEmail: '',
            newUserName: '',
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

  newUserEmailChange = (e) => {
    e.preventDefault();
    this.setState({ newUserEmail: e.target.value });
  }

  newUserNameChange = (e) => {
    e.preventDefault();
    this.setState({ newUserName: e.target.value });
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
    const { birthdayDate, birthdayGuestOfHonorId, newInvitees } = this.state;
    const updatedBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      guestOfHonorId: birthdayGuestOfHonorId,
    };
    birthdayData.putBirthday(birthdayId, updatedBirthday)
      .then(() => {
        this.saveUserContributors(birthdayId, newInvitees);
        this.props.history.push('/dashboard');
      })
      .catch((err) => console.error('Unable to create new birthday:', err));
  }

  createTemporaryUser = (e) => {
    e.preventDefault();
    const { newUserEmail, newUserName } = this.state;
    const newUser = {
      displayName: newUserName,
      email: newUserEmail,
      uid: '',
    };
    userData.postUser(newUser)
      .then(() => this.getBirthdayInfo())
      .catch((err) => console.error('There was an issue with creating a new user:', err));
  }

  render() {
    const {
      birthdayDate,
      birthdayGuestOfHonorId,
      users,
      guestOfHonorName,
      invitations,
      newInvitees,
      newUserEmail,
      newUserName,
    } = this.state;

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
            <form className="p-5 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 mx-auto my-5 edit-birthday-form">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="pb-5 px-2 mx-1 my-1 selection-column row">
                    <UserCheckboxGroup
                      users={users}
                      birthdayGuestOfHonorId={birthdayGuestOfHonorId}
                      userIsCheckedChange={this.userIsCheckedChange}
                      invitations={invitations}
                      isEdit={true}
                    />
                    <DatePicker
                      birthdayDate={birthdayDate}
                      birthdayDateChange={this.birthdayDateChange}
                      isEdit={true}
                    />
                    <NewUserForm
                      newUserEmail={newUserEmail}
                      newUserEmailChange={this.newUserEmailChange}
                      createTemporaryUser={this.createTemporaryUser}
                      newUserName={newUserName}
                      newUserNameChange={this.newUserNameChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="px-2 info-column p-1 mx-1 d-flex flex-column justify-content-around align-items-stretch">
                    <h2 className="declaration">This Birthday Event is for:</h2>
                    <h2 className="guest-of-honor-name">{guestOfHonorName}</h2>
                    <h5 className="on">on</h5>
                    <h2 className="birthday-date">{birthdayDate}</h2>
                    <div className="row">
                      <div className="col-12">
                        <h4 className="declaration already-invited-header">Guests Invited:</h4>
                        <ul className="guest-list mx-auto list-group list-group-flush">
                          {buildInviations}
                        </ul>
                      </div>
                      <div className="col-12">
                        <h4 className="my-2 declaration guest-invited-header">New Invited Guests:</h4>
                        <ul className="p-3 guest-list mx-auto list-group list-group-flush">
                          {makeGuestList}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="mt-5 col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4 btn birthday-edit-btn" onClick={this.updateBirthday}>Update</button>
            </form>
        </div>
    );
  }
}

export default EditBirthday;
