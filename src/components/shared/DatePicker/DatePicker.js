import React from 'react';
import PropTypes from 'prop-types';

import './DatePicker.scss';

class DatePicker extends React.Component {
  static propTypes = {
    birthdayDate: PropTypes.string.isRequired,
    birthdayDateChange: PropTypes.func.isRequired,
  }

  render() {
    const { birthdayDate, birthdayDateChange } = this.props;

    return (
      <div className="DatePicker mx-auto col-12">
        <div className="text-left m-auto date-picker">
            <h6>When is it?</h6>
            <label className="mx-2" htmlFor="start">Birthday date:</label>
            <input
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
