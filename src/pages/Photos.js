/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import axios from 'axios';
import { PhotosContext } from '../context/PhotosContext';
import { Modal, Search, ImageList, Card } from '../components';

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 35px;
`;

const Title = styled.h1`
  display: flex;
  font-size: 54px;
  margin: 15px 0 35px 0;
`;

const LinkButton = styled.button`
  padding-left: 4px;
  padding-right: 4px;
  width: 145px;
  overflow: hidden;
  height: 45px;
  text-align: center;
  text-transform: capitalize;
  padding: 13px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  margin: 5px 5px 15px 0;
  border: 1px solid #d1d1d1;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

export default function Photos() {
  const { photos, setSearch } = useContext(PhotosContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [pictureId, setPictureId] = useState(false);
  const [photoDetails, setPhotoDetails] = useState(false);

  const fetchResults = async () => {
    if (pictureId) {
      try {
        console.log(pictureId);
        const res = await axios(
          `https://api.unsplash.com/photos/${pictureId}?client_id=${process.env.REACT_APP_APIKEY}`
        );
        const { data } = res;
        console.log(data);
        setPhotoDetails(data);
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  useEffect(() => {
    console.log(pictureId);
    setModalOpen(true);
    fetchResults();
  }, [pictureId]);

  // useEffect(() => {
  //   const clickedPhoto = photos && pictureId && photos.filter(({ id }) => id === pictureId)[0];
  //   setPhotoDetails(clickedPhoto);
  // }, [pictureId]);

  const handleClose = () => {
    setModalOpen(null);
    setPictureId(null);
    setPhotoDetails(null);
  };
  const { photo } = useParams();

  const title = photo.charAt(0).toUpperCase() + photo.slice(1);

  const categories =
    photos &&
    photos
      .map(({ tags, id }) => tags && tags.map(({ title }) => title))
      .flat(1)
      .filter((v, i, a) => a.indexOf(v) === i);
  return (
    <Wrapper>
      <Search secondary small bg="#FFE4DC" css="margin: 0 auto;" />
      <Title>{title}</Title>
      <CategoriesWrapper>
        {categories &&
          categories.map((cat) => (
            <LinkButton key={cat} onClick={(e) => setSearch(e.target.innerText)}>
              {cat}
            </LinkButton>
          ))}
      </CategoriesWrapper>
      <ImageList>
        {photos &&
          photos.map(({ alt_description, urls, id }) => (
            <ImageList.Card key={id} alt={alt_description} url={urls.small} onClick={() => setPictureId(id)} />
          ))}
      </ImageList>
      <Modal isOpen={isModalOpen && photoDetails}>
        {isModalOpen && photoDetails && (
          <Card>
            <Card.Header>
              <Card.Wrapper>
                <Card.Title>{photoDetails.user.name && photoDetails.user.name}</Card.Title>
                <Card.Text>@{photoDetails.user.instagram_username && photoDetails.user.instagram_username}</Card.Text>
              </Card.Wrapper>
              <Card.Button onClick={handleClose}>CLOSE</Card.Button>
            </Card.Header>
            <Card.Image src={photoDetails.urls.regular} alt={photoDetails.alt_description} />
            <Card.Footer>{photoDetails.location.name}</Card.Footer>
          </Card>
        )}
      </Modal>
    </Wrapper>
  );
}
