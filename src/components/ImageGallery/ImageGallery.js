import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const API_KEY = '27905247-52ff39917099ed7913d47ea34';
// const PIXABAY_URL = `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

const STATUS = {
  IDLE: 'idle',
  PEDDING: 'pedding',
  RESOLVE: 'resolve',
  REJECT: 'reject',
};

class ImageGallery extends Component {
  state = {
    data: {},
    status: STATUS.IDLE,
  };

  componentDidUpdate(prevProps) {
    const prevFilter = prevProps.filter;
    const newFilter = this.props.filter;

    if (prevFilter !== newFilter) {
      this.setState({ status: STATUS.PEDDING });

      this.loadData({ page: 1, filter: newFilter });
    }
  }

  loadData({ page, filter }) {
    fetch(
      `https://pixabay.com/api/?q=${filter}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => this.setState({ data, status: STATUS.RESOLVE }));
  }

  render() {
    if (this.state.status === STATUS.RESOLVE) {
      return (
        <GalleryList>
          {this.state.data.hits.map(hit => (
            <ImageGalleryItem
              key={hit.id}
              src={hit.webformatURL}
              alt={hit.tags}
            />
          ))}
        </GalleryList>
      );
    }
  }
}

ImageGallery.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default ImageGallery;
