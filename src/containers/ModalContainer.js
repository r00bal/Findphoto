/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Route, useRouteMatch } from 'react-router-dom';
import { useFetch } from '../hooks';
import { Modal, Card } from '../components';
import { BASE_API_URL_UNPLASH_PHOTO } from '../constant';
// `https://api.unsplash.com/photos/${pictureId}?client_id=${process.env.REACT_APP_APIKEY}`

export function ModalContainer({ isOpen }) {
  const { id } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const [{ isLoading, data, isError }, setUrl] = useFetch(
    `${BASE_API_URL_UNPLASH_PHOTO}/${id}?client_id=${process.env.REACT_APP_APIKEY}`
  );

  console.log(data);

  const onModalClose = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Somthing went wrong...</p>;
  }

  if (data) {
    const { location, user, alt_description, urls } = data || {};
    return (
      <Modal isOpen={isOpen} role="dialog" aria-modal="true">
        <Card>
          <Card.Header>
            <Card.Wrapper>
              <Card.Title>{user && user.name}</Card.Title>
              <Card.Text>@{user && user.instagram_username}</Card.Text>
            </Card.Wrapper>
            <Card.Button
              autoFocus={isOpen}
              onClick={(e) => {
                onModalClose(e);
              }}
            >
              CLOSE
            </Card.Button>
          </Card.Header>
          <Card.Image src={urls.regular} alt={alt_description} />
          <Card.Footer>{location.name}</Card.Footer>
        </Card>
      </Modal>
    );
  }
  return null;
}

ModalContainer.propTypes = {
  isOpen: PropTypes.bool,
};
