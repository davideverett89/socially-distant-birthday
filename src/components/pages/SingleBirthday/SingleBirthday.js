import React from 'react';

import smash from '../../../helpers/data/smash';

import ToastCard from '../../shared/ToastCard/ToastCard';

import './SingleBirthday.scss';
import birthdayData from '../../../helpers/data/birthdayData';

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

  removeBirthday = () => {
    const { birthdayId } = this.props.match.params;
    birthdayData.deleteBirthday(birthdayId)
      .then(() => this.props.history.push('/dashboard'))
      .catch((err) => console.error('There was an issue with deleting this birthday:', err));
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
            <button className="btn delete-birthday-btn" onClick={this.removeBirthday}>Cancel</button>
        </div>
    );
  }
}

export default SingleBirthday;
