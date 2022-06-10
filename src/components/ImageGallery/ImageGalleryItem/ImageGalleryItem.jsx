import { Item, Image } from './ImageGalleryItem.styled';

function ImageGalleryItem({ src, alt, srcFullImg }) {
  return (
    <Item>
      <a href={srcFullImg} target="_blank" rel="noreferrer noopener">
        <Image src={src} alt={alt} />
      </a>
    </Item>
  );
}

export default ImageGalleryItem;
