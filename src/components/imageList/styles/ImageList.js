import styled from 'styled-components/macro';

export const ImageListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 0 10px;
  grid-auto-rows: 10px;
`;

export const Span = styled.span`
  width: 145px;
  overflow: hidden;
  height: 25px;
  text-align: center;
  text-transform: capitalize;
  padding: 4px 2px 4px 2px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  margin: 2px;
  border: 1px solid #d1d1d1;
  color: inherit;

  text-decoration: none;
`;

export const ImageCardWrapper = styled.div`
  cursor: pointer;
`;
export const Img = styled.img`
  width: 320px;
  margin-bottom: 5px;
`;
