import PropTypes from 'prop-types';
import { ButtonLoad, Wrapper } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <Wrapper>
      <ButtonLoad type="button" onClick={onClick}>
        Load more
      </ButtonLoad>
    </Wrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
