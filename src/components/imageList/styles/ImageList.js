import styled from 'styled-components/macro';

export const ImageListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 24px;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ImageCardWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 24px;
`;
export const Img = styled.img`
  /* min-width: 300px; */
  width: 100%;
  height: 100%;
`;
