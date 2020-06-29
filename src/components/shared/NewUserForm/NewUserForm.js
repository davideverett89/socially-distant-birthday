import React from 'react';
import PropTypes from 'prop-types';

import './NewUserForm.scss';

class NewUserForm extends React.Component {
  static propTypes = {
    newUserEmail: PropTypes.string.isRequired,
    newUserEmailChange: PropTypes.func.isRequired,
    newUserName: PropTypes.string.isRequired,
    newUserNameChange: PropTypes.func.isRequired,
    createTemporaryUser: PropTypes.func.isRequired,
  }

  render() {
    const {
      newUserEmail,
      newUserEmailChange,
      createTemporaryUser,
      newUserName,
      newUserNameChange,
    } = this.props;
    return (
      <div className="mt-3 NewUserForm col-12 mx-auto text-left">
        <h6 className="mt-1 new-user-form-header">Add a new user and invite them to the party!</h6>
        <div className="form-body d-flex justify-content-around align-items-center">
            <div className="form-group mb-2">
                <label htmlFor="new-user-email" className="email-label">Email</label>
                <input type="text" className="form-control" id="new-user-email" onChange={newUserEmailChange} value={newUserEmail} placeholder="example@gmail.com" />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="new-user-name" className="name-label">Name</label>
                <input type="text" className="form-control" id="new-user-name" onChange={newUserNameChange} value={newUserName} placeholder="David Everett" />
            </div>
            <button className="btn mb-2 invite-btn" onClick={createTemporaryUser}>Add New User</button>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
