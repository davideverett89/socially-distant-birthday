import React from 'react';
import PropTypes from 'prop-types';

import toastShape from '../../../helpers/propz/toastShape';

import './ToastCard.scss';

class ToastCard extends React.Component {
  static propTypes = {
    toast: toastShape.toastShape,
    removeToast: PropTypes.func.isRequired,
  }

  deleteToastEvent = (e) => {
    e.preventDefault();
    const { toast, removeToast } = this.props;
    removeToast(toast.id);
  }

  render() {
    const { toast } = this.props;
    return (
      <div className="ToastCard col-3">
        <div className="toast-card-shell mb-3">
            <div className="d-flex justify-content-end card-header">
              <button className="btn toast-delete-btn" onClick={this.deleteToastEvent}>&#215;</button>
            </div>
            <div className="card-body">
                <h5 className="card-title">{toast.contributorName}</h5>
                <p className="card-text">{toast.message}</p>
                <small>{toast.creationDate}</small>
            </div>
        </div>
      </div>
    );
  }
}

export default ToastCard;
