/* eslint-disable react/button-has-type */
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PhotosContext } from '../context/PhotosContext';
import { Modal } from '../components';

export default function Photos() {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  const [photos, setPhotos] = useContext(PhotosContext);
  const { photo } = useParams();
  console.log(photos);
  return (
    <>
      <h1>{photo}</h1>
      <button onClick={toggleModal}>open modal</button>
      <Modal isOpen={isModalOpen}>
        <button onClick={toggleModal}>close modal</button>
      </Modal>
    </>
  );
}

// Promise.all(
//   sortedWordsResult.data.map(({ word }) =>
//     axios
//       .get(
//         `https://api.unsplash.com/search/photos?query=${word}&per_page=10&client_id=${process.env.REACT_APP_APIKEY}`
//       )
//       .then((response) => {
//         const { total, results } = response.data;
//         return { total, results, word };
//       })
//       .catch((error) => {
//         console.log('error', error);
//       })
//   )
// ).then((res) => {
//   if (!res.total) {
//     setSuggestions('No results found');
//     return;
//   }
//   const topResults = res
//     .sort((a, b) => b.total - a.total)
//     .filter(({ total }) => total > 0)
//     .slice(0, 5);
//   if (topResults.length > 0) {
//     console.log(topResults);
//     setSuggestions(topResults.map(({ word }) => word));
//   } else {
//     setSuggestions('No results found');
//   }
// });
