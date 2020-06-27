import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import birthdayShape from '../../../helpers/propz/birthdayShape';

import './BirthdayCard.scss';

class BirthdayCard extends React.Component {
  static propTypes = {
    birthday: birthdayShape.birthdayShape,
    removeBirthday: PropTypes.func,
    currentUserCreated: PropTypes.bool,
  }

  render() {
    const { birthday, removeBirthday, currentUserCreated } = this.props;
    const singleLink = `/birthdays/${birthday.id}`;
    const editLink = `/birthdays/edit/${birthday.id}`;
    return (
        <div className="my-5 mx-auto BirthdayCard col-12">
            <div className="card-container">
                <div className="card-body container-fluid">
                    <div className="row">
                        <div className="col-3 column">
                            <h5 className="mb-0 card-title">{birthday.guestOfHonor}</h5>
                        </div>
                        <div className="col-3 column">
                            <p className="card-text">{birthday.date}</p>
                        </div>
                        <div className="col-6 third-column d-flex flex-row justify-content-around align-items-center">
                            <Link className="card-btn btn single-view-btn" to={singleLink}>View</Link>
                            {currentUserCreated ? <Link className="card-btn btn edit-birthday-btn" to={editLink}>Update</Link> : ''}
                            {currentUserCreated ? <button className="card-btn btn btn-danger delete-birthday-btn" onClick={() => removeBirthday(birthday.id)}>Cancel</button> : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default BirthdayCard;
