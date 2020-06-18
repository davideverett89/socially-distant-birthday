import React from 'react';

import toastShape from '../../../helpers/propz/toastShape';

import './ToastCard.scss';

class ToastCard extends React.Component {
  static propTypes = {
    toast: toastShape.toastShape,
  }

  render() {
    const { toast } = this.props;
    return (
      <div className="ToastCard col-3">
        <div className="toast-card-shell mb-3">
            <div className="card-header">{toast.contributorName}</div>
            <div className="card-body">
                <h5 className="card-title">{toast.creationDate}</h5>
                <p className="card-text">{toast.message}</p>
            </div>
        </div>
      </div>
    );
  }
}

export default ToastCard;
