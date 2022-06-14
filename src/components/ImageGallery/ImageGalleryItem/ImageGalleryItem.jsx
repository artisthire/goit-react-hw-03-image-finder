import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import { Item, Image, ImgModal } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { smallImg, fullImg, alt } = this.props;
    const { showModal } = this.state;

    return (
      <>
        <Item onClick={this.handleToggleModal}>
          <Image src={smallImg} alt={alt} />
        </Item>

        {showModal && (
          <Modal onClose={this.handleToggleModal}>
            <ImgModal src={fullImg} alt={alt} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  smallImg: PropTypes.string.isRequired,
  fullImg: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
