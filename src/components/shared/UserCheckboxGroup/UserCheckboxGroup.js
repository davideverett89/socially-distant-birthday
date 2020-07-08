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
    birthdayGuestOfHonorId: PropTypes.string.isRequired,
    userIsCheckedChange: PropTypes.func.isRequired,
    invitations: PropTypes.arrayOf(invitationShape.invitationShape),
    isEdit: PropTypes.bool.isRequired,
  }

  render() {
    const {
      users,
      birthdayGuestOfHonorId,
      userIsCheckedChange,
      invitations,
      isEdit,
    } = this.props;

    const buildCheckboxes = users.map((user) => {
      const isCurrentUserOrGOH = user.uid === authData.getUid() || user.id === birthdayGuestOfHonorId;
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
      <div className={`UserCheckboxGroup px-3 text-left mx-auto ${isEdit ? 'col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9' : 'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'}`}>
        {
          isEmpty
            ? ''
            : (
              <React.Fragment>
                <h6 className="mt-2 guest-invited-header text-white lead">{isEdit ? 'Who else are you inviting?' : 'Who are you inviting?'}</h6>
                <div className="overflow">
                  <div className="p-2 checkboxes mx-auto">
                    {buildCheckboxes}
                  </div>
                </div>
              </React.Fragment>
            )
        }
      </div>
    );
  }
}

export default UserCheckboxGroup;
