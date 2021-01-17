/* eslint-disable camelcase */
import react, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageListWrapper, Img, ImageCardWrapper } from './styles/ImageList';

const ImageCard = ({ url, alt, openModal }) => {
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
    <ImageCardWrapper style={{ gridRowEnd: `span ${state}` }} onClick={() => openModal(true)}>
      <Img ref={imageRef} src={url} alt={alt} />
    </ImageCardWrapper>
  );
};

const ImageList = ({ images, openModal, setPictureId }) => {
  const imgs =
    images &&
    images.map(({ id, urls, alt_description }) => (
      <ImageCard
        key={id}
        url={urls.small}
        alt={alt_description}
        openModal={openModal}
        onClick={() => setPictureId(id)}
      />
    ));

  return <ImageListWrapper>{imgs}</ImageListWrapper>;
};

export default ImageList;

ImageList.propTypes = {
  images: PropTypes.array,
  setPictureId: PropTypes.func,
  openModal: PropTypes.func,
};

ImageCard.propTypes = {
  openModal: PropTypes.func,
  url: PropTypes.string,
  alt: PropTypes.string,
};
