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
      <div className="mt-3 NewUserForm col-12 text-left">
        <h6>Invite a new user to join the party!</h6>
        <div className=" d-flex justify-content-around align-items-center">
            <div className="form-group mb-2">
                <label htmlFor="new-user-email" className="sr-only">Email</label>
                <input type="text" className="form-control-plaintext" id="new-user-email" onChange={newUserEmailChange} value={newUserEmail} placeholder="example@gmail.com" />
            </div>
            <div className="form-group mb-2">
                <label htmlFor="new-user-name" className="sr-only">Name</label>
                <input type="text" className="form-control-plaintext" id="new-user-name" onChange={newUserNameChange} value={newUserName} placeholder="David Everett" />
            </div>
            <button className="btn btn-primary mb-2" onClick={createTemporaryUser}>Send Invitation</button>
        </div>
      </div>
    );
  }
}

export default NewUserForm;
