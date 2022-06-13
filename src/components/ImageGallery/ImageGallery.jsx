import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryList, ImgModal } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
  };

  modalImgData = {
    src: '',
    alt: '',
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

  render() {
    const { showModal } = this.state;
    const { images } = this.props;
    const { src: modalImgSrc, alt: modalImgAlt } = this.modalImgData;

    return (
      <>
        {images.length > 0 && (
          <GalleryList>
            {images.map(image => {
              const { id, tags, webformatURL, largeImageURL } = image;

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
        )}

        {showModal && (
          <Modal onClose={this.handleToggleModal}>
            <ImgModal src={modalImgSrc} alt={modalImgAlt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
