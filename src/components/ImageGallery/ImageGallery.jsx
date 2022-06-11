import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, GalleryList, ImgModal } from './ImageGallery.styled';

import serverAPI from 'services/api';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Button from 'components/ImageGallery/Button';
import Loading from 'components/Loading';
import Notification from 'components/Notification';
import Modal from 'components/Modal';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    hits: [],
    totalHits: 0,
    currentPage: 1,
    showModal: false,
    status: STATUS.IDLE,
    error: null,
  };

  modalImgData = {
    src: '',
    alt: '',
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

  handleToggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  handleImageModalShow = ({ src, alt }) => {
    return () => {
      this.modalImgData = { src, alt };
      this.handleToggleModal();
    };
  };

  getImages({ page = 1, filter }) {
    const { imagesPerPage, onLoading } = this.props;

    this.setState({ status: STATUS.PENDING });
    onLoading(true);

    serverAPI
      .getData(filter, page, imagesPerPage)
      .then(data =>
        this.setState(prevState => ({
          hits: [...prevState.hits, ...data.hits],
          totalHits: data.totalHits,
          status: STATUS.RESOLVED,
        }))
      )
      .catch(error => this.setState({ error, status: STATUS.REJECTED }))
      .finally(() => onLoading(false));
  }

  haveMoreImages() {
    const { currentPage, totalHits } = this.state;
    const { imagesPerPage } = this.props;
    const isMoreImages = totalHits - currentPage * imagesPerPage > 0;

    return isMoreImages;
  }

  render() {
    const { status, error, hits, showModal } = this.state;
    const { src: modalImgSrc, alt: modalImgAlt } = this.modalImgData;
    const isMoreImages = this.haveMoreImages();

    return (
      <Container>
        <GalleryList>
          {hits.map(hit => {
            const { id, tags, webformatURL, largeImageURL } = hit;

            return (
              <ImageGalleryItem
                key={id}
                src={webformatURL}
                alt={tags}
                onClick={this.handleImageModalShow({
                  src: largeImageURL,
                  alt: tags,
                })}
              />
            );
          })}
        </GalleryList>

        {status === STATUS.RESOLVED && isMoreImages && (
          <Button onLoadMore={this.handleLoadMore} />
        )}

        {status === STATUS.PENDING && <Loading />}

        {status === STATUS.REJECTED && <Notification message={error.message} />}

        {showModal && (
          <Modal onClose={this.handleToggleModal}>
            <ImgModal src={modalImgSrc} alt={modalImgAlt} />
          </Modal>
        )}
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
