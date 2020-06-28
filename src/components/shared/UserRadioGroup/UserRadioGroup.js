import React from 'react';
import PropTypes from 'prop-types';

import userShape from '../../../helpers/propz/userShape';

import authData from '../../../helpers/data/authData';

import UserRadio from '../UserRadio/UserRadio';

import './UserRadioGroup.scss';

class UserRadioGroup extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(userShape.userShape),
    birthdayGuestOfHonorUid: PropTypes.string.isRequired,
    birthdayGuestOfHonorUidChange: PropTypes.func.isRequired,
  }

  render() {
    const { users, birthdayGuestOfHonorUid, birthdayGuestOfHonorUidChange } = this.props;

    return (
      <div className="UserRadioGroup px-5 text-left mx-auto col-6">
          <h6 className="mt-2 guest-invited-header text-white lead">Whose birthday is it?</h6>
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
                          birthdayGuestOfHonorUid={birthdayGuestOfHonorUid}
                          birthdayGuestOfHonorUidChange={birthdayGuestOfHonorUidChange}
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
