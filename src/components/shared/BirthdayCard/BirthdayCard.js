import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import birthdayShape from '../../../helpers/propz/birthdayShape';

import './BirthdayCard.scss';

class BirthdayCard extends React.Component {
  static propTypes = {
    birthday: birthdayShape.birthdayShape,
    removeBirthday: PropTypes.func.isRequired,
    currentUserCreated: PropTypes.bool.isRequired,
  }

  render() {
    const { birthday, removeBirthday, currentUserCreated } = this.props;
    const singleLink = `/birthdays/${birthday.id}`;
    const editLink = `/birthdays/edit/${birthday.id}`;
    return (
        <div className="my-5 BirthdayCard col-12">
            <div className="mx-auto card-container">
                <div className="card-body container-fluid">
                    <div className="row">
                        <div className="col-3 first-column">
                            <h5 className="mb-0 card-title">{birthday.guestOfHonor}</h5>
                        </div>
                        <div className="col-3 second-column">
                            <p className="card-text">{birthday.date}</p>
                        </div>
                        <div className="col-6 third-column">
                            <Link className="mx-2 btn btn-success single-view-btn" to={singleLink}>View</Link>
                            {currentUserCreated ? <Link className="mx-2 btn edit-birthday-btn" to={editLink}>Update</Link> : ''}
                            {currentUserCreated ? <button className="mx-2 btn btn-danger delete-birthday-btn" onClick={() => removeBirthday(birthday.id)}>Cancel</button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default BirthdayCard;
