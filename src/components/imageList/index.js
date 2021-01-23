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
    const height = imageRef.current.clientHeight;

    const spans = Math.ceil(height / 25);
    console.log(height, spans);
    setState(spans);
  };

  // useEffect(() => {
  //   imageRef.current.addEventListener('load', setSpans);
  //   return () => {
  //     imageRef.current.removeEventListener('load', setSpans);
  //   };
  // });
  //  style={{ gridRowEnd: `span ${state}`}}
  return (
    <ImageCardWrapper {...restProps}>
      <Img ref={imageRef} src={url} alt={alt} width="50%" height="50%" />
    </ImageCardWrapper>
  );
};

ImageList.propTypes = {
  children: PropTypes.array,
  images: PropTypes.array,
  setPictureId: PropTypes.func,
  openModal: PropTypes.func,
};

ImageList.Card.propTypes = {
  children: PropTypes.array,
  url: PropTypes.string,
  alt: PropTypes.string,
};
