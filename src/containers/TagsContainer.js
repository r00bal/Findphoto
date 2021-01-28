import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoriesContainer = styled.div`
  margin-bottom: 35px;
  width: 100%;
  height: 50px;
  max-width: 1300px;
`;

const CategoriesInnerWrapper = styled.div`
  position: absolute;
  display: inline-flex;

  overflow-x: hidden;
  top: 0;
  left: 0;
  width: fit-content;
`;

const CategoriesOuterWrapper = styled.div`
  position: relative;
  height: 100%;
  min-width: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
`;

const LinkButton = styled(Link)`
  width: 145px;
  margin-right: 5px;
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

export default function TagsContainer({ categories }) {
  return (
    <CategoriesContainer>
      <CategoriesOuterWrapper>
        <CategoriesInnerWrapper>
          {categories &&
            categories.map((cat) => (
              <LinkButton key={cat} onClick={(e) => console.log(e)}>
                {cat}
              </LinkButton>
            ))}
        </CategoriesInnerWrapper>
      </CategoriesOuterWrapper>
    </CategoriesContainer>
  );
}

TagsContainer.propTypes = {
  categories: PropTypes.array,
};
