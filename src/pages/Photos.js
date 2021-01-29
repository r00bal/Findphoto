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
import { BASE_API_URL_UNPLASH_PHOTOS, PER_PAGE } from '../constant';
import { ModalContainer, TagsContainer } from '../containers';

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  margin-top: 100px;
  /* height: calc(100vh - 100px);
  overflow: auto; */
`;

const CategoriesContainer = styled.div`
  margin-bottom: 35px;
  width: 100%;
  height: 150px;
  max-width: 1300px;
`;

const CategoriesInnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const CategoriesOuterWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Title = styled.h1`
  display: flex;
  font-size: 54px;
  margin: 15px 0 35px 0;
`;

const LinkButton = styled.button`
  width: 145px;
  overflow: hidden;
  height: 45px;
  text-align: center;
  text-transform: capitalize;
  padding: 13px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
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

const AutocompleteWrapper = styled.div`
  border-bottom: 1px solid #d1d1d1;
  height: 100px;
  width: 100%;
  padding: 1rem 2rem 3rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 3;
`;

const Container = styled.div`
  overflow: auto;
  height: 100vh;
`;

export default function Photos() {
  const { photo } = useParams();
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [{ isLoading, data, isError }, setUrl] = useFetch(null);
  const [search, setSearch] = useState(null);

  const resetSearch = () => {
    setPhotos([]);
    setPage(1);
    setSearch(null);
  };
  // API Call on photo change
  useEffect(() => {
    resetSearch();
    const url = `${BASE_API_URL_UNPLASH_PHOTOS}?query=${photo}&page=${page}&per_page=${PER_PAGE}&client_id=${process.env.REACT_APP_APIKEY}`;
    setUrl(url);
  }, [photo]);

  // API Call on page number change
  useEffect(() => {
    if (page > 1 && !isLoading) {
      const url = `${BASE_API_URL_UNPLASH_PHOTOS}?query=${photo}&page=${page}&per_page=${PER_PAGE}&client_id=${process.env.REACT_APP_APIKEY}`;
      setUrl(url);
    }
  }, [page]);

  useEffect(() => {
    // prevents keeping old state on new search
    if (data !== null && data.results.length > 0 && page === 1) {
      setPhotos(data.results);
    }
    // merge results for infiniteScroll
    if (page > 1 && data.results.length > 0) {
      setPhotos((prev) => {
        const mergeAndRemoveDuplicates = [...prev, ...data.results].filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );
        return mergeAndRemoveDuplicates;
      });
    }
  }, [data]);

  useEffect(() => {
    if (search && search !== photo) {
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
    <Container onScroll={handleScroll}>
      <AutocompleteWrapper>
        <Autocomplete focusable={false} secondary bg="#d1d1d1" onSubmit={setSearch} />
      </AutocompleteWrapper>

      <Wrapper>
        <Title>{title}</Title>

        {categories && <TagsContainer categories={categories} />}
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
    </Container>
  );
}
