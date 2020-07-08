import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import toastShape from '../../../helpers/propz/toastShape';

import './ToastCard.scss';

class ToastCard extends React.Component {
  static propTypes = {
    toast: toastShape.toastShape,
    removeToast: PropTypes.func.isRequired,
    birthdayId: PropTypes.string.isRequired,
    isUserCreated: PropTypes.bool.isRequired,
  }

  deleteToastEvent = (e) => {
    e.preventDefault();
    const { toast, removeToast } = this.props;
    removeToast(toast.id);
  }

  render() {
    const { toast, birthdayId, isUserCreated } = this.props;
    const editLink = `/birthdays/${birthdayId}/toasts/edit/${toast.id}`;
    return (
      <div className="ToastCard col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <div className="toast-card-shell mb-3">
            <div className="header d-flex justify-content-between align-items-center card-header">
              {
                isUserCreated
                  ? (
                  <React.Fragment>
                    <Link className="mx-1 btn btn-outline-dark edit-toast-btn" to={editLink}><i className="fas fa-edit fa-1x"></i></Link>
                    <button className="mx-1 btn btn-outline-light toast-delete-btn" onClick={this.deleteToastEvent}><i className="fas fa-times"></i></button>
                  </React.Fragment>
                  )
                  : ''
              }
            </div>
            <div className="body card-body">
                <h5 className="toast-text card-title">{toast.contributorName}</h5>
                <p className="toast-text card-text">{toast.message}</p>
                <small>{toast.creationDate}</small>
            </div>
        </div>
      </div>
    );
  }
}

export default ToastCard;
