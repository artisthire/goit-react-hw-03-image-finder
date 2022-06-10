import PropTypes from 'prop-types';
import { Container, Text } from './Notification.styled';

function Notification({ message }) {
  return (
    <Container role="alert">
      <Text>{message}</Text>
    </Container>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
