import styled from 'styled-components/macro';

export const ImageListWrapper = styled.div`
  column-count: 3;

  column-gap: 24px;
`;

export const ImageCardWrapper = styled.div`
  break-inside: avoid;
  cursor: pointer;
  margin-bottom: 12px;
  display: flex;
`;
export const Img = styled.img`
  /* min-width: 300px; */
  flex: 100%;
  margin-top: 12px;
`;
