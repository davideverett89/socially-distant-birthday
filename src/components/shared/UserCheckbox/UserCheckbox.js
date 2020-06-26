import React from 'react';
import PropTypes from 'prop-types';

import userShape from '../../../helpers/propz/userShape';

import './UserCheckbox.scss';

class UserCheckbox extends React.Component {
  static propTypes = {
    user: userShape.userShape,
    userIsCheckedChange: PropTypes.func.isRequired,
  }

  render() {
    const { user, userIsCheckedChange } = this.props;
    return (
        <div className="UserCheckbox">
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={user.id} id={`userCheck-${user.id}`} onChange={userIsCheckedChange} checked={user.isChecked} />
                <label className="form-check-label" htmlFor={`userCheck-${user.id}`}>{user.displayName}</label>
            </div>
        </div>
    );
  }
}

export default UserCheckbox;
