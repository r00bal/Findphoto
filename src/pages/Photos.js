/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components/macro';
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

  useEffect(() => {
    const clickedPhoto = photos && pictureId && photos.filter(({ id }) => id === pictureId)[0];
    setPhotoDetails(clickedPhoto);
  }, [pictureId]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const { photo } = useParams();

  const title = photo.charAt(0).toUpperCase() + photo.slice(1);
  const images =
    photos &&
    photos.map(({ urls, alt_description, id, tags }) => ({
      urls,
      alt_description,
      id,
      tags,
    }));

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
      <ImageList images={images} openModal={setModalOpen} setPictureId={setPictureId} />
      <Modal isOpen={isModalOpen}>
        {/* {photoDetails && (
          <Card>
            <Card.Header>
              <Card.Wrapper>
                <Card.Title>{photoDetails.user.name}</Card.Title>
                <Card.Text>{photoDetails.user.location}</Card.Text>
              </Card.Wrapper>
            </Card.Header>
            <Card.Button onClick={() => setModalOpen(false)}>CLOSE</Card.Button>
            <Card.Img src={photoDetails.urls.regular} alt={photoDetails.alt_description} />
            <Card.Footer>{photoDetails.user.name}</Card.Footer>
          </Card>
          // <>{console.log(photoDetails)}</>
        )} */}
      </Modal>
    </Wrapper>
  );
}
