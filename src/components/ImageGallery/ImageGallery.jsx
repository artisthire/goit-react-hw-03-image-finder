import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

function ImageGallery({ images }) {
  return (
    images.length > 0 && (
      <GalleryList>
        {images.map(image => {
          const { id, alt, smallImg, fullImg } = image;

          return (
            <ImageGalleryItem
              key={id}
              smallImg={smallImg}
              fullImg={fullImg}
              alt={alt}
            />
          );
        })}
      </GalleryList>
    )
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      alt: PropTypes.string.isRequired,
      smallImg: PropTypes.string.isRequired,
      fullImg: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
