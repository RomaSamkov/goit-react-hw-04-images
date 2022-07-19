import { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonForm, ButtonLabel, Form, Input } from './SearchForm.styled';
import { FaSearch } from 'react-icons/fa';

class SearchForm extends Component {
  state = { value: '' };

  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ value: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <ButtonForm type="submit" onSubmit={this.handleSubmit}>
          <FaSearch size={30}></FaSearch>
          <ButtonLabel>Search</ButtonLabel>
        </ButtonForm>

        <Input
          type="text"
          name="query"
          value={this.state.value}
          onChange={this.handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
