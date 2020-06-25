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
        <div className="NewToast my-5">
            <h1 className="display-3 new-toast-header">Say Something Nice!</h1>
            <form className="p-5 col-9 mx-auto new-toast-form">
              <div className="my-5 form-group">
                <textarea className="toast-textarea form-control" id="toast-input" rows="3" value={toastMessage} onChange={this.toastMessageChange}></textarea>
              </div>
              <button className="my-5 col-4 btn toast-save-btn" onClick={this.saveToast}>Save</button>
            </form>
        </div>
    );
  }
}

export default NewToast;
