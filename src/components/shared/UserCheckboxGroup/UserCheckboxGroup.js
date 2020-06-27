import React from 'react';
import PropTypes from 'prop-types';

import userShape from '../../../helpers/propz/userShape';
import invitationShape from '../../../helpers/propz/invitationShape';

import authData from '../../../helpers/data/authData';

import UserCheckbox from '../UserCheckbox/UserCheckbox';

import './UserCheckboxGroup.scss';

class UserCheckboxGroup extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(userShape.userShape),
    birthdayGuestOfHonorUid: PropTypes.string.isRequired,
    userIsCheckedChange: PropTypes.func.isRequired,
    invitations: PropTypes.arrayOf(invitationShape.invitationShape),
    isEdit: PropTypes.bool.isRequired,
  }

  render() {
    const {
      users,
      birthdayGuestOfHonorUid,
      userIsCheckedChange,
      invitations,
      isEdit,
    } = this.props;

    return (
      <div className={`UserCheckboxGroup p-5 text-left ${isEdit ? 'col-12' : 'col-6'}`}>
        <h6 className="guest-invited-header">Who are you inviting?</h6>
        <div className="checkboxes">
            {
                users.map((user) => {
                  const isCurrentUserOrGOH = user.uid === authData.getUid() || user.uid === birthdayGuestOfHonorUid;
                  const isUserAlreadyInvited = invitations.find((x) => x.userId === user.id) !== undefined;
                  if (isCurrentUserOrGOH || isUserAlreadyInvited) return '';
                  return (
                    <UserCheckbox
                        key={user.id}
                        user={user}
                        userIsCheckedChange={userIsCheckedChange}
                    />
                  );
                })
            }
        </div>
      </div>
    );
  }
}

export default UserCheckboxGroup;
