import React from 'react';
import PropTypes from 'prop-types';

import userShape from '../../../helpers/propz/userShape';

import authData from '../../../helpers/data/authData';

import UserRadio from '../UserRadio/UserRadio';

import './UserRadioGroup.scss';

class UserRadioGroup extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(userShape.userShape),
    birthdayGuestOfHonorId: PropTypes.string.isRequired,
    birthdayGuestOfHonorIdChange: PropTypes.func.isRequired,
  }

  render() {
    const { users, birthdayGuestOfHonorId, birthdayGuestOfHonorIdChange } = this.props;

    return (
      <div className="UserRadioGroup px-3 text-left mx-auto col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
          <h6 className="mt-2 guest-invited-header">Whose birthday is it?</h6>
          <div className="overflow">
            <div className="p-2 radios">
                {
                    users.map((user) => {
                      const isCurrentUser = user.uid === authData.getUid();
                      if (isCurrentUser) return null;
                      return (
                        <UserRadio
                          key={user.id}
                          user={user}
                          birthdayGuestOfHonorId={birthdayGuestOfHonorId}
                          birthdayGuestOfHonorIdChange={birthdayGuestOfHonorIdChange}
                        />
                      );
                    })
                }
            </div>
          </div>
      </div>
    );
  }
}

export default UserRadioGroup;
