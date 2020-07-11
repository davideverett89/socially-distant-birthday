import React from 'react';

import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';
import birthdayData from '../../../helpers/data/birthdayData';
import userContributorData from '../../../helpers/data/userContributorData';
import notificationData from '../../../helpers/data/notificationData';

import UserRadioGroup from '../../shared/UserRadioGroup/UserRadioGroup';
import UserCheckboxGroup from '../../shared/UserCheckboxGroup/UserCheckboxGroup';
import DatePicker from '../../shared/DatePicker/DatePicker';
import NewUserForm from '../../shared/NewUserForm/NewUserForm';
import PhotoUploader from '../../shared/PhotoUploader/PhotoUploader';

import './NewBirthday.scss';

class NewBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayImage: '',
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

  componentWillUnmount() {
    this.setState({ birthdayImage: '' });
  }

  birthdayDateChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayDate: e.target.value });
  }

  birthdayImageChange = (image) => {
    this.setState({ birthdayImage: image });
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

  sendInvitations = (invitees) => {
    const addresses = [];
    userData.getUsers()
      .then((users) => {
        invitees.forEach((singleInvitee) => {
          const invitedUser = users.find((x) => x.id === singleInvitee);
          addresses.push(invitedUser.email);
        });
        const siteUrl = 'https://socially-distant-birthday.firebaseapp.com';
        const subject = 'You\'ve been invited to Apparty!';
        const message = `${authData.getDisplayName()} has invited you to a birthday event! Come join the fun: ${siteUrl}`;
        notificationData.sendEmails(addresses, subject, message);
      })
      .catch((err) => console.error('There was an issue with getting all the users:', err));
  }

  saveUserContributors = (birthdayId, invitees) => {
    invitees.forEach((userId) => {
      const newUserContributor = {
        birthdayId,
        userId,
      };
      userContributorData.postUserContributor(newUserContributor);
    });
    this.sendInvitations(invitees);
  };

  saveBirthday = (e) => {
    e.preventDefault();
    const {
      birthdayDate,
      birthdayImage,
      birthdayGuestOfHonorId,
      invitees,
    } = this.state;
    const newBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      image: birthdayImage,
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
      birthdayImage,
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
                    <PhotoUploader birthdayImageChange={this.birthdayImageChange} image={birthdayImage} isToast={false} />
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
                  <div className="info-column p-2 my-1 mx-1 d-flex flex-column justify-content-center align-items-center">
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
