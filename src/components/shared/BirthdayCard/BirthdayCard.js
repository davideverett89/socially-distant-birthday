import React from 'react';

import birthdayShape from '../../../helpers/propz/birthdayShape';

import './BirthdayCard.scss';

class BirthdayCard extends React.Component {
  static propTypes = {
    birthday: birthdayShape.birthdayShape,
  }

  render() {
    const { birthday } = this.props;
    return (
        <div className="my-5 BirthdayCard col-12">
            <div className="mx-auto card-container">
                <div className="card-body container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <h5 className="mb-0 card-title">{birthday.guestOfHonor}</h5>
                        </div>
                        <div className="col-4">
                            <p className="card-text">{birthday.date}</p>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default BirthdayCard;
