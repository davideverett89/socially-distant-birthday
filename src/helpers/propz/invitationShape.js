import PropTypes from 'prop-types';

const invitationShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  birthdayId: PropTypes.string.isRequired,
  invitedUserName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
});

export default { invitationShape };
