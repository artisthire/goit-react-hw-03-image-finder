import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { IoIosSearch } from 'react-icons/io';
import { Container, Form, Button, Label, Input } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    filter: '',
  };

  inputId = nanoid(5);

  handleChange = ({ target }) => {
    this.setState({ filter: target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (!this.props.isLoading) {
      const normalizedFilter = this.state.filter.trim().toLowerCase();
      this.setState({ filter: '' });

      if (normalizedFilter === '') {
        alert('Request cannot be empty');
        return;
      }

      this.props.onSubmit(normalizedFilter);
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Button
            type="submit"
            aria-label="Search"
            disabled={this.props.isLoading}
          >
            <IoIosSearch />
          </Button>
          <Label htmlFor={this.inputId}>Search images and photos</Label>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            required
            placeholder="Search images and photos"
            id={this.inputId}
            value={this.state.filter}
            onChange={this.handleChange}
          />
        </Form>
      </Container>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Searchbar;
