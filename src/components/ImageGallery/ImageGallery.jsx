import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, GalleryList } from './ImageGallery.styled';

import serverAPI from 'services/api';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Button from 'components/ImageGallery/Button';
import Loading from 'components/Loading';
import Notification from 'components/Notification';

const STATUS = {
  IDLE: 'idle',
  PEDDING: 'pedding',
  RESOLVE: 'resolve',
  REJECT: 'reject',
};

class ImageGallery extends Component {
  state = {
    hits: [],
    totalHits: 0,
    currentPage: 1,
    status: STATUS.IDLE,
    error: null,
  };

  componentDidUpdate(prevProps) {
    const prevFilter = prevProps.filter;
    const newFilter = this.props.filter;

    if (newFilter && prevFilter !== newFilter) {
      this.setState({ hits: [], totalHits: 0, currentPage: 1 });
      this.getImages({ filter: newFilter });
    }
  }

  handleLoadMore = () => {
    const nextPage = this.state.currentPage + 1;
    this.getImages({ page: nextPage, filter: this.props.filter });
    this.setState({ currentPage: nextPage });
  };

  getImages({ page, filter }) {
    this.setState({ status: STATUS.PEDDING });
    this.props.onLoading(true);
    const { imagesPerPage } = this.props;

    serverAPI
      .getData(filter, page, imagesPerPage)
      .then(data =>
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          totalHits: data.totalHits,
          status: STATUS.RESOLVE,
        }))
      )
      .catch(error => this.setState({ error, status: STATUS.REJECT }))
      .finally(() => this.props.onLoading(false));
  }

  haveMoreImages() {
    const { currentPage, totalHits } = this.state;
    const { imagesPerPage } = this.props;
    const isMoreImages = totalHits - currentPage * imagesPerPage > 0;

    return isMoreImages;
  }

  render() {
    const { status, error, hits } = this.state;
    const isMoreImages = this.haveMoreImages();

    return (
      <Container>
        <GalleryList>
          {hits.map(hit => (
            <ImageGalleryItem
              key={hit.id}
              src={hit.webformatURL}
              srcFullImg={hit.largeImageURL}
              alt={hit.tags}
            />
          ))}
        </GalleryList>

        {status === STATUS.RESOLVE && isMoreImages && (
          <Button onLoadMore={this.handleLoadMore} />
        )}

        {status === STATUS.PEDDING && <Loading />}

        {status === STATUS.REJECT && <Notification message={error.message} />}
      </Container>
    );
  }
}

ImageGallery.propTypes = {
  imagesPerPage: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onLoading: PropTypes.func.isRequired,
};

export default ImageGallery;
