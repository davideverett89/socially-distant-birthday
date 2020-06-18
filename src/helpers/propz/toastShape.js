import PropTypes from 'prop-types';

const toastShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  birthdayId: PropTypes.string.isRequired,
  contributorName: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { toastShape };
