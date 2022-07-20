import { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonForm, ButtonLabel, Form, Input } from './SearchForm.styled';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Enter what images you want !');
      return;
    }
    onSubmit(query);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ButtonForm type="submit" onSubmit={handleSubmit}>
        <FaSearch size={30}></FaSearch>
        <ButtonLabel>Search</ButtonLabel>
      </ButtonForm>

      <Input
        type="text"
        name="query"
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </Form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
