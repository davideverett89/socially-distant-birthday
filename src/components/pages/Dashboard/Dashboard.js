import React from 'react';

import smash from '../../../helpers/data/smash';
import authData from '../../../helpers/data/authData';

import BirthdayCard from '../../shared/BirthdayCard/BirthdayCard';

import './Dashboard.scss';

class Dashboard extends React.Component {
  state = {
    myBirthdays: [],
    myInvitedBirthdays: [],
  }

  getMyBirthdayEvents = () => {
    smash.getBirthdaysWithGuestsOfHonor(authData.getUid())
      .then((birthdays) => {
        this.setState({ myBirthdays: birthdays });
      })
      .catch((err) => console.error('There was an issue with getting user created birthdays:', err));
  }

  getMyInvitedBirthdayEvents = () => {
    smash.getInvitedBirthdaysByUserUid(authData.getUid())
      .then((birthdays) => {
        this.setState({ myInvitedBirthdays: birthdays });
      })
      .catch((err) => console.error('There is an issue with getting your invited birthdays:', err));
  }

  removeBirthday = (birthdayId) => {
    smash.deleteBirthdayAndBirthdayInvitationsAndToasts(birthdayId)
      .then(() => {
        this.getMyBirthdayEvents();
        this.getMyInvitedBirthdayEvents();
      })
      .catch((err) => console.error('There was an issue with deleting this birthday:', err));
  }

  componentDidMount() {
    this.getMyBirthdayEvents();
    this.getMyInvitedBirthdayEvents();
  }

  render() {
    const { myBirthdays, myInvitedBirthdays } = this.state;
    const makeBirthdayCards = myBirthdays.map((birthday) => (
      <BirthdayCard key={birthday.id} birthday={birthday} removeBirthday={this.removeBirthday} currentUserCreated={true} />
    ));
    const makeInvitations = myInvitedBirthdays.map((birthday) => (
      <BirthdayCard key={birthday.id} birthday={birthday} removeBirthday={this.removeBirthday} currentUserCreated={false} />
    ));
    return (
        <div className="col-11 my-5 Dashboard container-fluid p-5">
            <h1 className="mb-5 display-4 dashboard-header">Your Birthday Dashboard!</h1>
            <div className="row">
              <div className="col-6">
                <div className="birthday-column">
                  <h2 className="m-2">Organized Birthdays</h2>
                  {makeBirthdayCards}
                </div>
              </div>
              <div className="col-6">
                <div className="birthday-column">
                  <h2 className="m-2">Invited Birthdays</h2>
                  {makeInvitations}
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
