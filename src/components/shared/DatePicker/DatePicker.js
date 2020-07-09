import React from 'react';
import PropTypes from 'prop-types';

import './DatePicker.scss';

class DatePicker extends React.Component {
  static propTypes = {
    birthdayDate: PropTypes.string.isRequired,
    birthdayDateChange: PropTypes.func.isRequired,
    isEdit: PropTypes.bool.isRequired,
  }

  render() {
    const { birthdayDate, birthdayDateChange, isEdit } = this.props;

    return (
      <div className="mt-3 px-3 DatePicker mx-auto col-12 d-flex justify-content-center align-items-center">
        <div className="date-picker">
            <h6 className="mt-1">{isEdit ? 'Do you wish to change the date?' : 'When is it?'}</h6>
            <label className="mx-3" htmlFor="start">Birthday date:</label>
            <input
              className="mb-1"
              type="date"
              id="start"
              name="trip-start"
              value={birthdayDate}
              min="1900-01-01"
              max="2020-12-31"
              onChange={birthdayDateChange}
            />
        </div>
      </div>
    );
  }
}

export default DatePicker;
