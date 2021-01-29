import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

const CategoriesContainer = styled.div`
  margin-bottom: 35px;
  width: 100%;
  height: 50px;
  max-width: 1300px;
  position: relative;
  &:before,
  &:after {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    content: '';
    display: block;
    pointer-events: none;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1;
    width: 100px;
  }
  &:before {
    left: 0;
    width: 100px;
    background: linear-gradient(270deg, hsla(0, 0%, 100%, 0) 0, #fff 95%, #fff);
    opacity: ${({ blur }) => (blur.before ? 1 : 0)};
  }
  &:after {
    z-index: 1;
    right: 0;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0) 0, #fff 95%, #fff);
    opacity: ${({ blur }) => (blur.after ? 1 : 0)};
  }
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
  color: #949494;
  cursor: pointer;
  text-decoration: none;
  &:focus,
  &:hover {
    outline: none;
    border: 1px solid black;
    color: #000000;
  }
`;

export default function TagsContainer({ categories }) {
  const [blur, setBlur] = useState({ before: false, after: true });

  const handleScrool = (event) => {
    const { scrollLeft, clientWidth, scrollWidth } = event.currentTarget;

    if (scrollLeft === 0) {
      setBlur((prev) => ({ ...prev, ...{ before: false } }));
    }
    if (scrollLeft > 0) {
      setBlur((prev) => ({ ...prev, ...{ before: true } }));
    }
    if (scrollWidth - clientWidth === scrollLeft) {
      setBlur((prev) => ({ ...prev, ...{ after: false } }));
    }
    if (clientWidth < scrollWidth && scrollWidth - clientWidth !== scrollLeft) {
      setBlur((prev) => ({ ...prev, ...{ after: true } }));
    }
  };
  return (
    <CategoriesContainer blur={blur}>
      <CategoriesOuterWrapper onScroll={handleScrool}>
        <CategoriesInnerWrapper>
          {categories &&
            categories.map((cat) => (
              <LinkButton
                key={cat}
                to={{
                  pathname: `/search/${cat}`,
                  state: { resetSearch: true },
                }}
              >
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
