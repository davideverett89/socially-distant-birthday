import React from 'react';

import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';
import birthdayData from '../../../helpers/data/birthdayData';
import userContributorData from '../../../helpers/data/userContributorData';

import UserRadioGroup from '../../shared/UserRadioGroup/UserRadioGroup';
import UserCheckboxGroup from '../../shared/UserCheckboxGroup/UserCheckboxGroup';
import DatePicker from '../../shared/DatePicker/DatePicker';
import NewUserForm from '../../shared/NewUserForm/NewUserForm';

import './NewBirthday.scss';

class NewBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayGuestOfHonorId: '',
    guestOfHonorName: '',
    newUserEmail: '',
    newUserName: '',
    users: [],
    invitees: [],
  }

  getInfo = () => {
    userData.getUsers()
      .then((_users) => {
        const users = [];
        _users.forEach((user) => {
          const thisUser = { isChecked: false, ...user };
          users.push(thisUser);
        });
        this.setState({
          users,
          newUserEmail: '',
          newUserName: '',
        });
      })
      .catch((err) => console.error('There was an issue getting all users:', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  birthdayDateChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayDate: e.target.value });
  }

  birthdayGuestOfHonorIdChange = (e) => {
    const { userName } = e.target.dataset;
    this.setState({ birthdayGuestOfHonorId: e.target.value, guestOfHonorName: userName });
    this.resetUsers();
  }

  newUserEmailChange = (e) => {
    e.preventDefault();
    this.setState({ newUserEmail: e.target.value });
  }

  newUserNameChange = (e) => {
    e.preventDefault();
    this.setState({ newUserName: e.target.value });
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
    const { birthdayDate, birthdayGuestOfHonorId, invitees } = this.state;
    const newBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      guestOfHonorId: birthdayGuestOfHonorId,
    };
    birthdayData.postBirthday(newBirthday)
      .then((response) => {
        const newBirthdayId = response.data.name;
        this.saveUserContributors(newBirthdayId, invitees);
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
      .then(() => this.getInfo())
      .catch((err) => console.error('There was an issue with createing a new user:', err));
  }

  render() {
    const {
      birthdayDate,
      birthdayGuestOfHonorId,
      users,
      guestOfHonorName,
      invitees,
      newUserEmail,
      newUserName,
    } = this.state;

    const makeGuestList = invitees.map((user, i) => {
      const thisUser = users.find((x) => x.id === user);
      return (
        <li key={`invitation${i + 1}`} className="guest-list-item">{thisUser.displayName}</li>
      );
    });

    return (
        <div className="NewBirthday my-5">
            <h1 className="new-birthday-header display-3">Create A New Birthday!</h1>
            <form className="p-5 col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10 mx-auto my-5 new-birthday-form">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="pb-5 px-2 mx-1 my-1 selection-column row">
                    <UserRadioGroup
                      users={users}
                      birthdayGuestOfHonorId={birthdayGuestOfHonorId}
                      birthdayGuestOfHonorIdChange={this.birthdayGuestOfHonorIdChange}
                    />
                    <UserCheckboxGroup
                      users={users}
                      birthdayGuestOfHonorId={birthdayGuestOfHonorId}
                      userIsCheckedChange={this.userIsCheckedChange}
                      invitations={[]}
                      isEdit={false}
                    />
                    <DatePicker
                      birthdayDate={birthdayDate}
                      birthdayDateChange={this.birthdayDateChange}
                      isEdit={false}
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
                  <div className="info-column p-2 my-1 mx-1 d-flex flex-column justify-content-start align-items-center">
                    <h2 className="declaration">I am planning a Birthday Event for:</h2>
                    {guestOfHonorName === ''
                      ? ''
                      : (<h3 className="guest-of-honor-name">{guestOfHonorName}</h3>)
                    }
                    <h4 className="on">{birthdayDate === '' ? '' : 'on'}</h4>
                    <h3 className="birthday-date">{birthdayDate}</h3>
                    <h2 className="declaration my-2 guest-invited-header">Guests Invited:</h2>
                    <ul className="p-3 guest-list col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mx-auto list-group list-group-flush">
                        {makeGuestList}
                    </ul>
                  </div>
                </div>
              </div>
              <button className="mt-5 col-4 btn birthday-save-btn" onClick={this.saveBirthday}>Save</button>
            </form>
        </div>
    );
  }
}

export default NewBirthday;
