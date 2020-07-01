import React from 'react';
import PropTypes from 'prop-types';

import userShape from '../../../helpers/propz/userShape';

import './UserRadio.scss';

class UserRadio extends React.Component {
  static propTypes = {
    user: userShape.userShape,
    birthdayGuestOfHonorId: PropTypes.string.isRequired,
    birthdayGuestOfHonorIdChange: PropTypes.func.isRequired,
  }

  render() {
    const { user, birthdayGuestOfHonorId, birthdayGuestOfHonorIdChange } = this.props;
    return (
        <div className="UserRadio">
            <div className="form-check">
                <input className="form-check-input" type="radio" name="userRadio" data-user-name={user.displayName} id={user.id} value={user.id} onChange={birthdayGuestOfHonorIdChange} checked={birthdayGuestOfHonorId === user.id} />
                <label className="form-check-label" htmlFor={user.id}>{user.displayName}</label>
            </div>
        </div>
    );
  }
}

export default UserRadio;
