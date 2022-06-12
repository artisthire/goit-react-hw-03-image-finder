import { Component } from 'react';
import { Wrapper } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';

const IMAGES_PER_PAGE = 12;

class App extends Component {
  state = {
    filter: '',
    isLoading: false,
  };

  handleFormSubmit = filter => {
    this.setState({ filter });
  };

  handleLoading = isLoading => {
    this.setState({ isLoading });
  };

  render() {
    const { filter, isLoading } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} isLoading={isLoading} />
        <ImageGallery
          imagesPerPage={IMAGES_PER_PAGE}
          filter={filter}
          onLoading={this.handleLoading}
        />
      </Wrapper>
    );
  }
}

export default App;
