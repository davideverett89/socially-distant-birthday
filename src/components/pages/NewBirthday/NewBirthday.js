import React from 'react';

import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';
import birthdayData from '../../../helpers/data/birthdayData';

import './NewBirthday.scss';

class NewBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayGuestOfHonorUid: '',
    users: [],
  }

  componentDidMount() {
    userData.getUsers()
      .then((users) => this.setState({ users }))
      .catch((err) => console.error('There was an issue getting all users:', err));
  }

  birthdayDateChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayDate: e.target.value });
  }

  birthdayGuestOfHonorUidChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayGuestOfHonorUid: e.target.value });
  }

  saveBirthday = (e) => {
    e.preventDefault();
    const { birthdayDate, birthdayGuestOfHonorUid } = this.state;
    const newBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      guestOfHonorUid: birthdayGuestOfHonorUid,
    };
    birthdayData.postBirthday(newBirthday)
      .then(() => this.props.history.push('/dashboard'))
      .catch((err) => console.error('Unable to create new birthday:', err));
  }

  render() {
    const { birthdayDate, users } = this.state;
    const makeUserRadios = users.map((user, i) => (
      <div key={user.id} className="form-check">
        <input className="form-check-input" type="radio" name="userRadios" id={`userRadios${i + 1}`} value={user.uid} onClick={this.birthdayGuestOfHonorUidChange} />
        <label className="form-check-label" htmlFor={`userRadios${i + 1}`}>{user.displayName}</label>
      </div>
    ));
    return (
        <div className="NewBirthday my-5">
            <h1>New Birthday</h1>
            <form className="col-9 mx-auto my-5 new-birthday-form">
              <div className="row">
                <div className="col-4">
                <label className="mx-2" htmlFor="start">Start date:</label>
                <input type="date" id="start" name="trip-start"
                  value={birthdayDate}
                  min="1900-01-01" max="2020-12-31" onChange={this.birthdayDateChange} />
                </div>
                <div className="text-left col-4">
                  {makeUserRadios}
                </div>
                <div className="col-4">
                </div>
              </div>
              <button className="btn birthday-save-btn" onClick={this.saveBirthday}>Save Birthday</button>
            </form>
        </div>
    );
  }
}

export default NewBirthday;
