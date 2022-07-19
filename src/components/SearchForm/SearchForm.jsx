import { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonForm, ButtonLabel, Form, Input } from './SearchForm.styled';
import { FaSearch } from 'react-icons/fa';

const SearchForm = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
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
        value={value}
        onChange={handleChange}
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
