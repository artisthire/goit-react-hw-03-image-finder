import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { Container, Form, Button, Label, Input } from './Searchbar.styled';

class Searchbar extends Component {
  inputId = nanoid(5);

  state = {
    filter: '',
  };

  handleChange = ({ target }) => {
    this.setState({ filter: target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const normalizeFilter = this.state.filter.trim().toLowerCase();

    this.props.onFiterChange(normalizeFilter);
    this.setState({ filter: '' });
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit" aria-label="Search">
            <SearchIcon />
          </Button>
          <Label htmlFor={this.inputId}>Search images and photos</Label>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            id={this.inputId}
            value={this.state.filter}
            onChange={this.handleChange}
          ></Input>
        </Form>
      </Container>
    );
  }
}

Searchbar.propTypes = {
  onFiterChange: PropTypes.func.isRequired,
};

export default Searchbar;
