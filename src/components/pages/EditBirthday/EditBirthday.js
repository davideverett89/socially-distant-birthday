import React from 'react';

import smash from '../../../helpers/data/smash';
import birthdayData from '../../../helpers/data/birthdayData';
import userData from '../../../helpers/data/userData';
import authData from '../../../helpers/data/authData';

import './EditBirthday.scss';

class EditBirthday extends React.Component {
  state = {
    birthdayDate: '',
    birthdayGuestOfHonorUid: '',
    guestOfHonorName: '',
    users: [],
  }

  componentDidMount() {
    const { birthdayId } = this.props.match.params;
    smash.getSingleBirthdayWithGuestOfHonor(birthdayId)
      .then((birthday) => {
        userData.getUsers().then((users) => {
          this.setState({
            birthdayDate: birthday.date,
            birthdayGuestOfHonorUid: birthday.guestOfHonorUid,
            guestOfHonorName: birthday.guestOfHonor,
            users,
          });
        });
      })
      .catch((err) => console.error('There was an issue with getting this birthday:', err));
  }

  birthdayDateChange = (e) => {
    e.preventDefault();
    this.setState({ birthdayDate: e.target.value });
  }

  birthdayGuestOfHonorUidChange = (e) => {
    const { userName } = e.target.dataset;
    this.setState({ birthdayGuestOfHonorUid: e.target.value, guestOfHonorName: userName });
  }

  updateBirthday = (e) => {
    e.preventDefault();
    const { birthdayId } = this.props.match.params;
    const { birthdayDate, birthdayGuestOfHonorUid } = this.state;
    const updatedBirthday = {
      creatorUid: authData.getUid(),
      date: birthdayDate,
      guestOfHonorUid: birthdayGuestOfHonorUid,
    };
    birthdayData.putBirthday(birthdayId, updatedBirthday)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch((err) => console.error('Unable to create new birthday:', err));
  }

  render() {
    const {
      birthdayDate, birthdayGuestOfHonorUid, users, guestOfHonorName,
    } = this.state;
    const makeUserRadios = users.map((user, i) => (
      <div key={user.id} className="form-check">
        <input className="form-check-input" type="radio" name="userRadios" data-user-name={user.displayName} id={`userRadios${i + 1}`} value={user.uid} onChange={this.birthdayGuestOfHonorUidChange} checked={birthdayGuestOfHonorUid === user.uid} />
        <label className="form-check-label" htmlFor={`userRadios${i + 1}`}>{user.displayName}</label>
      </div>
    ));

    return (
        <div className="EditBirthday my-5">
            <h1>Edit Birthday</h1>
            <form className="p-5 col-9 mx-auto my-5 edit-birthday-form">
            <div className="row">
                <div className="col-6">
                  <div className="row">
                    <div className="text-left col-6">
                      <h6>Whose birthday is it?</h6>
                      {makeUserRadios}
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
                <div className="col-6">
                  {/* This is all just a test */}
                    <h2 className="display-4">I am planning a Birthday Event for:</h2>
                    <h2 className="display-4">{guestOfHonorName}</h2>
                    {guestOfHonorName === '' ? '' : <h2 className="display-4">on</h2>}
                    <h2 className="display-4">{birthdayDate}</h2>
                    <h2>Guests Invited:</h2>
                </div>
              </div>
              <button className="btn birthday-edit-btn" onClick={this.updateBirthday}>Update Birthday</button>
            </form>
        </div>
    );
  }
}

export default EditBirthday;
