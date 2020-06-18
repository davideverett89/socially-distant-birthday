import React from 'react';

import smash from '../../../helpers/data/smash';

import ToastCard from '../../shared/ToastCard/ToastCard';

import './SingleBirthday.scss';

class SingleBirthday extends React.Component {
  state = {
    birthday: {},
    toasts: [],
  }

  componentDidMount() {
    const { birthdayId } = this.props.match.params;
    smash.getSingleBirthdayWithGuestOfHonor(birthdayId)
      .then((birthday) => {
        this.setState({ birthday });
        smash.getToastsWithContributorNameByBirthdayId(birthdayId)
          .then((toasts) => this.setState({ toasts }));
      })
      .catch((err) => console.error('There is an issue with getting a single birthday object and its toasts:', err));
  }

  render() {
    const { birthday, toasts } = this.state;
    const makeToasts = toasts.map((toast) => (
      <ToastCard key={toast.id} toast={toast} />
    ));
    return (
        <div className="SingleBirthday">
            <h1>{birthday.guestOfHonor}'s Birthday!</h1>
            <div className="d-flex flex-wrap">
              {makeToasts}
            </div>
        </div>
    );
  }
}

export default SingleBirthday;
