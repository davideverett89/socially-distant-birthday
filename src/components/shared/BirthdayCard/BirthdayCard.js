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
                        <div className="full-length col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 column d-flex flex-column justify-content-center align-items-center">
                            <h5 className="mb-0">{birthday.guestOfHonor}</h5>
                        </div>
                        <div className="full-length col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 column d-flex flex-column justify-content-center align-items-center">
                            <p className="m-auto">{birthday.date}</p>
                        </div>
                        <div className="full-length my-1 col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 d-flex flex-column justify-content-center align-items-stretch third-column container-fluid">
                            <Link className="card-btn btn single-view-btn" to={singleLink}>View</Link>
                            {currentUserCreated ? <Link className="my-1 card-btn btn edit-birthday-btn" to={editLink}>Update</Link> : ''}
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
