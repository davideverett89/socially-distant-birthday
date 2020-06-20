import React from 'react';
import { Link } from 'react-router-dom';

import smash from '../../../helpers/data/smash';
import authData from '../../../helpers/data/authData';
import toastData from '../../../helpers/data/toastData';

import ToastCard from '../../shared/ToastCard/ToastCard';

import './SingleBirthday.scss';

class SingleBirthday extends React.Component {
  state = {
    birthday: {},
    toasts: [],
    currentUserCreated: false,
  }

  getBirthdayData = () => {
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

  componentDidMount() {
    this.getBirthdayData();
  }

  removeBirthday = () => {
    const { birthdayId } = this.props.match.params;
    smash.deleteBirthdayAndBirthdayInvitations(birthdayId)
      .then(() => this.props.history.push('/dashboard'))
      .catch((err) => console.error('There was an issue with deleting this birthday:', err));
  }

  removeToast = (toastId) => {
    toastData.deleteToast(toastId)
      .then(() => this.getBirthdayData())
      .catch((err) => console.error('There was an issue with deleting this toast:', err));
  }

  render() {
    const { birthday, toasts, currentUserCreated } = this.state;
    const { birthdayId } = this.props.match.params;
    const editLink = `/birthdays/edit/${birthdayId}`;
    const newToastLink = `/birthdays/${birthdayId}/toasts/new`;
    const makeToasts = toasts.map((toast) => (
      <ToastCard key={toast.id} toast={toast} removeToast={this.removeToast} />
    ));
    return (
        <div className="SingleBirthday my-5">
            <h1>{birthday.guestOfHonor}'s Birthday!</h1>
            <Link className="my-5 btn add-toast-btn" to={newToastLink}>Add New Toast</Link>
            <div className="mb-3 d-flex flex-wrap">
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
