/* eslint-disable camelcase */

import PropTypes from 'prop-types';
import { BlurredUpImage } from '..';
import { ImageListWrapper, ImageCardWrapper } from './styles/ImageList';

export default function ImageList({ children, ...restProps }) {
  return <ImageListWrapper {...restProps}>{children}</ImageListWrapper>;
}

ImageList.Card = function ImageCard({ urls, alt, ...restProps }) {
  return (
    <ImageCardWrapper {...restProps}>
      <BlurredUpImage tinyImg={urls.thumb} largeImg={urls.small} alt={alt} />
    </ImageCardWrapper>
  );
};

ImageList.propTypes = {
  children: PropTypes.array,
  images: PropTypes.array,
  setPictureId: PropTypes.func,
  openModal: PropTypes.func,
  infinteScroll: PropTypes.bool,
};

ImageList.Card.propTypes = {
  children: PropTypes.array,
  urls: PropTypes.array,
  alt: PropTypes.string,
};
