/* eslint-disable camelcase */
import react, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageListWrapper, Img, ImageCardWrapper } from './styles/ImageList';

export default function ImageList({ children, ...restProps }) {
  return <ImageListWrapper {...restProps}>{children}</ImageListWrapper>;
}

ImageList.Card = function ImageCard({ url, alt, ...restProps }) {
  const [state, setState] = useState(0);
  const imageRef = useRef(null);

  const setSpans = () => {
    const height = imageRef.current.clientHeight + 30;
    const spans = Math.ceil(height / 10);
    setState(spans);
  };

  useEffect(() => {
    imageRef.current.addEventListener('load', setSpans);
  });

  return (
    <ImageCardWrapper style={{ gridRowEnd: `span ${state}` }} {...restProps}>
      <Img ref={imageRef} src={url} alt={alt} />
    </ImageCardWrapper>
  );
};

ImageList.propTypes = {
  children: PropTypes.object,
  images: PropTypes.array,
  setPictureId: PropTypes.func,
  openModal: PropTypes.func,
};

ImageList.Card.propTypes = {
  children: PropTypes.object,
  url: PropTypes.string,
  alt: PropTypes.string,
};
