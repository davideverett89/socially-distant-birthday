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

    const buildCheckboxes = users.map((user) => {
      const isCurrentUserOrGOH = user.uid === authData.getUid() || user.uid === birthdayGuestOfHonorUid;
      const isUserAlreadyInvited = invitations.find((x) => x.userId === user.id) !== undefined;
      if (isCurrentUserOrGOH || isUserAlreadyInvited) return null;
      return (
        <UserCheckbox
          key={user.id}
          user={user}
          userIsCheckedChange={userIsCheckedChange}
        />
      );
    });

    const isEmpty = buildCheckboxes.every((x) => x === null);

    return (
      <div className={`UserCheckboxGroup px-5 text-left ${isEdit ? 'col-12' : 'col-6'}`}>
        {
          isEmpty
            ? ''
            : (
              <React.Fragment>
                <h6 className="guest-invited-header">Who are you inviting?</h6>
                <div className="checkboxes">
                  {buildCheckboxes}
                </div>
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default UserCheckboxGroup;
