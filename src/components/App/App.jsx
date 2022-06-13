import { Component } from 'react';
import serverAPI from 'services/api';

import { Wrapper, Inner } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Notification from 'components/Notification';
import Button from 'components/Button';
import Loading from 'components/Loading';

const IMAGES_PER_PAGE = 12;

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    filter: '',
    hits: [],
    totalHits: 0,
    currentPage: 1,
    status: STATUS.IDLE,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const prevFilter = prevState.filter;
    const newFilter = this.state.filter;

    if (newFilter && prevFilter !== newFilter) {
      this.setState({ hits: [], totalHits: 0, currentPage: 1 });
      this.getImages({ filter: newFilter });
    }
  }

  handleFormSubmit = filter => {
    this.setState({ filter });
  };

  handleLoadMore = () => {
    const { currentPage, filter } = this.state;
    const nextPage = currentPage + 1;

    this.getImages({ page: nextPage, filter });
    this.setState({ currentPage: nextPage });
  };

  getImages({ filter, page = 1, perPage = IMAGES_PER_PAGE }) {
    this.setState({ status: STATUS.PENDING });

    serverAPI
      .getData(filter, page, perPage)
      .then(data =>
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          totalHits: data.totalHits,
          status: STATUS.RESOLVED,
        }))
      )
      .catch(error => this.setState({ error, status: STATUS.REJECTED }));
  }

  haveMoreImages() {
    const { currentPage, totalHits } = this.state;
    const isMoreImages = totalHits - currentPage * IMAGES_PER_PAGE > 0;

    return isMoreImages;
  }

  render() {
    const { hits, status, error } = this.state;
    const isMoreImages = this.haveMoreImages() && status === STATUS.RESOLVED;

    return (
      <Wrapper>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          isLoading={status === STATUS.PENDING}
        />

        <Inner>
          <ImageGallery images={hits} />

          {isMoreImages && <Button onClick={this.handleLoadMore} />}

          {status === STATUS.PENDING && <Loading />}

          {status === STATUS.REJECTED && (
            <Notification message={error.message} />
          )}
        </Inner>
      </Wrapper>
    );
  }
}

export default App;
