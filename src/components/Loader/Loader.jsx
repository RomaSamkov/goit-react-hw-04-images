import { BallTriangle } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

const Loader = () => {
  return (
    <Wrapper>
      <BallTriangle
        height="200"
        width="200"
        color="#3f51b5"
        ariaLabel="loading"
      />
    </Wrapper>
  );
};

export default Loader;
