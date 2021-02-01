import PropTypes from 'prop-types';
import { useProgressiveImg } from '../../hooks';

const BlurredUpImage = ({ tinyImg, largeImg, alt }) => {
  const [src, { blur }] = useProgressiveImg(tinyImg, largeImg);
  return (
    <img
      alt={alt}
      src={src}
      style={{
        height: '100%',
        width: '100%',
        filter: blur ? 'blur(20px)' : 'none',
        transition: blur ? 'none' : 'filter 0.3s ease-out',
      }}
    />
  );
};

BlurredUpImage.propTypes = {
  tinyImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default BlurredUpImage;
