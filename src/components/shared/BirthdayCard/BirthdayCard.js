import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import birthdayShape from '../../../helpers/propz/birthdayShape';

import './BirthdayCard.scss';

class BirthdayCard extends React.Component {
  static propTypes = {
    birthday: birthdayShape.birthdayShape,
    removeBirthday: PropTypes.func.isRequired,
  }

  render() {
    const { birthday, removeBirthday } = this.props;
    const singleLink = `/birthdays/${birthday.id}`;
    return (
        <div className="my-5 BirthdayCard col-12">
            <div className="mx-auto card-container">
                <div className="card-body container-fluid">
                    <div className="row">
                        <div className="col-4 first-column">
                            <h5 className="mb-0 card-title">{birthday.guestOfHonor}</h5>
                        </div>
                        <div className="col-4 second-column">
                            <p className="card-text">{birthday.date}</p>
                        </div>
                        <div className="col-4 third-column">
                            <Link className="mx-2 btn single-view-btn" to={singleLink}>View</Link>
                            <button className="mx-2 btn delete-birthday-btn" onClick={() => removeBirthday(birthday.id)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default BirthdayCard;
