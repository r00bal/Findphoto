/* eslint-disable camelcase */
import react, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageListWrapper, Img, ImageCardWrapper } from './styles/ImageList';

export default function ImageList({ children, ...restProps }) {
  return <ImageListWrapper {...restProps}>{children}</ImageListWrapper>;
}

ImageList.Card = function ImageCard({ url, alt, ...restProps }) {
  return (
    <ImageCardWrapper {...restProps}>
      <Img src={url} alt={alt} />
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
  url: PropTypes.string,
  alt: PropTypes.string,
};
