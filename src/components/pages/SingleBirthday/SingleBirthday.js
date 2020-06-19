import React from 'react';
import { Link } from 'react-router-dom';

import smash from '../../../helpers/data/smash';
import authData from '../../../helpers/data/authData';

import ToastCard from '../../shared/ToastCard/ToastCard';

import './SingleBirthday.scss';
import birthdayData from '../../../helpers/data/birthdayData';

class SingleBirthday extends React.Component {
  state = {
    birthday: {},
    toasts: [],
    currentUserCreated: false,
  }

  componentDidMount() {
    const { birthdayId } = this.props.match.params;
    smash.getSingleBirthdayWithGuestOfHonor(birthdayId)
      .then((birthday) => {
        const currentUserCreated = birthday.creatorUid === authData.getUid();
        this.setState({ birthday, currentUserCreated });
        smash.getToastsWithContributorNameByBirthdayId(birthdayId)
          .then((toasts) => this.setState({ toasts }));
      })
      .catch((err) => console.error('There is an issue with getting a single birthday object and its toasts:', err));
  }

  removeBirthday = () => {
    const { birthdayId } = this.props.match.params;
    birthdayData.deleteBirthday(birthdayId)
      .then(() => this.props.history.push('/dashboard'))
      .catch((err) => console.error('There was an issue with deleting this birthday:', err));
  }

  render() {
    const { birthday, toasts, currentUserCreated } = this.state;
    const { birthdayId } = this.props.match.params;
    const editLink = `/birthdays/edit/${birthdayId}`;
    const makeToasts = toasts.map((toast) => (
      <ToastCard key={toast.id} toast={toast} />
    ));
    return (
        <div className="SingleBirthday">
            <h1>{birthday.guestOfHonor}'s Birthday!</h1>
            <div className="d-flex flex-wrap">
              {makeToasts}
            </div>
            {
              currentUserCreated
                ? (
                <React.Fragment>
                  <Link className="mx-2 btn edit-birthday-btn" to={editLink}>Update</Link>
                  <button className="mx-2 btn delete-birthday-btn" onClick={this.removeBirthday}>Cancel</button>
                </React.Fragment>
                )
                : ''
            }
        </div>
    );
  }
}

export default SingleBirthday;
