import { Item, ItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ smallImgURL, id }) => {
  return (
    <Item>
      <ItemImage src={smallImgURL} alt={id} loading="lazy" />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  smallImgURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
