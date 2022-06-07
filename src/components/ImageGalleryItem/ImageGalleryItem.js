import { Item, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ src, alt }) {
  return (
    <Item>
      <Image src={src} alt={alt} />
    </Item>
  );
}

export default ImageGalleryItem;
