import styled from 'styled-components/macro';

export const ImageListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
`;

export const ImageCardWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 24px;
`;
export const Img = styled.img`
  /* min-width: 300px; */
  width: 100%;
`;
