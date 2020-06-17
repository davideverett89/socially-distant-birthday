import React from 'react';

import smash from '../../../helpers/data/smash';
import authData from '../../../helpers/data/authData';

import BirthdayCard from '../../shared/BirthdayCard/BirthdayCard';

import './Dashboard.scss';

class Dashboard extends React.Component {
  state = {
    myBirthdays: [],
  }

  getMyBirthdayEvents = () => {
    smash.getBirthdaysWithGuestsOfHonor(authData.getUid())
      .then((birthdays) => {
        this.setState({ myBirthdays: birthdays });
      })
      .catch((err) => console.error('There was an issue with getting user created birthdays:', err));
  }

  componentDidMount() {
    this.getMyBirthdayEvents();
  }

  render() {
    const { myBirthdays } = this.state;
    const makeBirthdayCards = myBirthdays.map((birthday) => (
      <BirthdayCard key={birthday.id} birthday={birthday} />
    ));
    return (
        <div className="Dashboard container-fluid p-5">
            <h1 className="mb-5 display-2 dashboard-header">Your Birthday Dashboard</h1>
            <div className="row">
              <div className="col-6">
                <div className="birthday-column">
                  <h3 className="m-2">Organized Birthdays</h3>
                  {makeBirthdayCards}
                </div>
              </div>
              <div className="col-6">
                <div className="birthday-column">
                  <h3 className="m-2">Invited Birthdays</h3>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
