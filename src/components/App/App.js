import { Component } from 'react';
import { Wrapper } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

class App extends Component {
  state = {
    filter: '',
  };

  handleFilterChange = filter => {
    this.setState({ filter });
  };

  render() {
    const filter = this.state.filter.trim().toLowerCase();

    return (
      <Wrapper>
        <Searchbar onFiterChange={this.handleFilterChange}></Searchbar>
        <ImageGallery filter={filter}></ImageGallery>
      </Wrapper>
    );
  }
}

export default App;
