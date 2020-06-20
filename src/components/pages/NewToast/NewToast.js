import React from 'react';

import moment from 'moment';

import authData from '../../../helpers/data/authData';
import toastData from '../../../helpers/data/toastData';

import './NewToast.scss';

class NewToast extends React.Component {
  state = {
    toastMessage: '',
  }

  toastMessageChange = (e) => {
    e.preventDefault();
    this.setState({ toastMessage: e.target.value });
  }

  saveToast = (e) => {
    e.preventDefault();
    const { birthdayId } = this.props.match.params;
    const { toastMessage } = this.state;
    const newToast = {
      birthdayId,
      message: toastMessage,
      creationDate: moment().format('MMMM Do YYYY, h:mm:ss a'),
      uid: authData.getUid(),
    };
    toastData.postToast(newToast)
      .then(() => this.props.history.push(`/birthdays/${birthdayId}`))
      .catch((err) => console.error('There was an issue with creating a new toast:', err));
  }

  render() {
    const { toastMessage } = this.state;
    return (
        <div className="NewToast">
            <h1>New Toast</h1>
            <form className="col-9 mx-auto new-toast-form">
              <div className="form-group">
                <label htmlFor="toast-input">Say something nice:</label>
                <textarea className="form-control" id="toast-input" rows="3" value={toastMessage} onChange={this.toastMessageChange}></textarea>
              </div>
              <button className="btn toast-save-btn" onClick={this.saveToast}>Add Toast</button>
            </form>
        </div>
    );
  }
}

export default NewToast;
