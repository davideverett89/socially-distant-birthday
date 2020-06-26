import PropTypes from 'prop-types';

const userShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
});

export default { userShape };
