import SearchForm from 'components/SearchForm';
import PropTypes from 'prop-types';

import { SearchBarContainer } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  return (
    <SearchBarContainer>
      <SearchForm onSubmit={onSubmit} />
    </SearchBarContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
