/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory, useLocation, Route, Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components/macro';
import axios from 'axios';
import { useFetch } from '../hooks';
import { Modal, ImageList, Card, Autocomplete } from '../components';
import { ArrangeEqualHeightColumns, GetCategories } from '../utils';
import { BASE_API_URL_UNPLASH_PHOTOS } from '../constant';
import { ModalContainer } from '../containers/ModalContainer';

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  max-width: 1320px;
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
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
const Center = styled.p`
  text-align: center;
`;

export default function Photos() {
  const { photo } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [{ isLoading, data, isError }, setUrl] = useFetch();
  const [search, setSearch] = useState(null);

  // API Call
  useEffect(() => {
    const url = `${BASE_API_URL_UNPLASH_PHOTOS}?query=${photo}&page=${page}&per_page=10&client_id=${process.env.REACT_APP_APIKEY}`;
    setUrl(url);
  }, [photo, page]);

  // merges states for infiniteScroll
  useEffect(() => {
    // prevents keeping old state on new search
    if (data !== null && data.results.length > 0 && page === 1) {
      setPhotos(data.results);
    }
    if (page > 1 && data.results.length > 0) {
      setPhotos((prev) => [...prev, ...data.results]);
    }
    console.log(photos);
  }, [data]);

  // reset states in case of Input submission
  useEffect(() => {
    setPhotos([]);
    setPage(1);
    if (search) {
      history.push(`/search/${search}`);
    }
  }, [search]);

  const title = photo.charAt(0).toUpperCase() + photo.slice(1);
  const categories = photos && GetCategories(photos);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    // trigger next API call when container bottom is reached and prevent API calls when max of total results is reached
    if (scrollHeight - scrollTop === clientHeight && !isLoading && data.total !== photos.length) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Autocomplete
        focusable={false}
        secondary
        bg="#FFE4DC"
        css={`
          margin: 0 auto;
          margin-top: 50px;
        `}
        onSubmit={setSearch}
      />
      <Wrapper onScroll={handleScroll}>
        <Title>{title}</Title>

        <CategoriesWrapper>
          {categories &&
            categories.map((cat) => (
              <LinkButton key={cat} onClick={(e) => console.log(e)}>
                {cat}
              </LinkButton>
            ))}
        </CategoriesWrapper>
        {photos.length > 0 && photos && (
          <ImageList>
            {ArrangeEqualHeightColumns(photos, page).map((column, index) => (
              <div key={index}>
                {column.map(({ alt_description, urls, id }) => (
                  <Link
                    key={id}
                    to={{
                      pathname: `/search/${photo}/${id}`,
                      state: { modal: true },
                    }}
                  >
                    <ImageList.Card alt={alt_description} url={urls.small} />
                  </Link>
                ))}
              </div>
            ))}
          </ImageList>
        )}

        {isLoading && <Center>Loading . . .</Center>}
        {isError && <Center>Something went wrong</Center>}
        {photos.length === 0 && !isLoading && !isError && <Center>No results found</Center>}
        {location.state && location.state.modal ? (
          <Route path={`${url}/:id`}>
            <ModalContainer isOpen={location.state.modal} />
          </Route>
        ) : null}
      </Wrapper>
    </>
  );
}
