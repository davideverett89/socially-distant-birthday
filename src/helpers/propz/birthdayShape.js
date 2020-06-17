import PropTypes from 'prop-types';

const birthdayShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  guestOfHonor: PropTypes.string.isRequired,
  guestOfHonorUid: PropTypes.string.isRequired,
  creatorUid: PropTypes.string.isRequired,
});

export default { birthdayShape };
