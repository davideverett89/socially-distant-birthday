import React from 'react';

import toastData from '../../../helpers/data/toastData';

import './EditToast.scss';

class EditToast extends React.Component {
  state = {
    toastMessage: '',
  }

  componentDidMount() {
    const { toastId } = this.props.match.params;
    toastData.getSingleToast(toastId)
      .then((response) => {
        const toast = response.data;
        this.setState({ toastMessage: toast.message });
      })
      .catch((err) => console.error('There was an issue with getting single toast:', err));
  }

  toastMessageChange = (e) => {
    e.preventDefault();
    this.setState({ toastMessage: e.target.value });
  }

  updateToast = (e) => {
    e.preventDefault();
    const { toastId, birthdayId } = this.props.match.params;
    const { toastMessage } = this.state;
    const updatedMessage = toastMessage;
    toastData.patchToast(toastId, updatedMessage)
      .then(() => this.props.history.push(`/birthdays/${birthdayId}`))
      .catch((err) => console.error('There was an issue with creating a new toast:', err));
  }

  render() {
    const { toastMessage } = this.state;
    return (
        <div className="EditToast">
            <h1>Edit Toast</h1>
            <form className="col-9 mx-auto update-toast-form">
              <div className="form-group">
                <label htmlFor="toast-input">Say something nice:</label>
                <textarea className="form-control" id="toast-input" rows="3" value={toastMessage} onChange={this.toastMessageChange}></textarea>
              </div>
              <button className="btn toast-update-btn" onClick={this.updateToast}>Update Toast</button>
            </form>
        </div>
    );
  }
}

export default EditToast;
