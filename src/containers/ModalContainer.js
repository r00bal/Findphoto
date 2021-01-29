/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Route, useRouteMatch } from 'react-router-dom';
import { useFetch } from '../hooks';
import { Modal, Card } from '../components';
import { BASE_API_URL_UNPLASH_PHOTO } from '../constant';

export default function ModalContainer({ isOpen }) {
  const { id } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const [{ isLoading, data, isError }, setUrl] = useFetch(
    `${BASE_API_URL_UNPLASH_PHOTO}/${id}?client_id=${process.env.REACT_APP_APIKEY}`
  );

  const onModalClose = (e) => {
    history.goBack();
  };

  const modalRef = useRef();
  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  const handleTabKey = (e) => {
    const focusableModalElements = Array.from(
      modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
      )
    );
    e.preventDefault();
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];
    const active = document.activeElement;
    const indexOfActiveElement = focusableModalElements.indexOf(active);

    if (focusableModalElements.indexOf(active) === -1) {
      firstElement.focus();
    }
    if (!e.shiftKey && indexOfActiveElement < focusableModalElements.length - 1) {
      focusableModalElements[indexOfActiveElement + 1].focus();
      return e.preventDefault();
    }
    if (!e.shiftKey && indexOfActiveElement === focusableModalElements.length - 1) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && indexOfActiveElement === 0) {
      lastElement.focus();
      return e.preventDefault();
    }
    if (e.shiftKey && indexOfActiveElement > 0) {
      focusableModalElements[indexOfActiveElement - 1].focus();
      return e.preventDefault();
    }
  };

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ]);

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
        <div style={{ height: '100%', width: '100%' }} ref={modalRef}>
          <Card>
            <Card.Header>
              <Card.Wrapper>
                <Card.Title tabIndex="0">{user && user.name}</Card.Title>
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
            <Card.Image src={urls.regular} alt={alt_description} tabIndex="0" />
            <Card.Footer>{location.name}</Card.Footer>
          </Card>
        </div>
      </Modal>
    );
  }
  return null;
}

ModalContainer.propTypes = {
  isOpen: PropTypes.bool,
};
