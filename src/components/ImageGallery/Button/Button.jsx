import PropTypes from 'prop-types';
import { LoadButton } from './Button.styled';

function Button({ onLoadMore }) {
  return (
    <LoadButton type="button" onClick={onLoadMore}>
      Load more
    </LoadButton>
  );
}

export default Button;

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
