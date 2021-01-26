import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid #d1d1d1;
  margin: 0;
  font-size: 0.75rem;
  border-radius: 4px;
  height: 30px;
  padding: 8px 12px 8px 12px;
  line-height: 1;
  &:hover {
    border: 1px solid black;
    color: black;
  }
`;
export const Header = styled.header`
  align-self: flex-start;
  display: flex;
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
`;
export const HeaderWrapper = styled.div``;
export const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 1rem;
`;
export const Text = styled.p`
  padding: 0;
  margin: 0;
  color: #949494;
  font-size: 0.7rem;
`;
export const Footer = styled.footer``;
export const Img = styled.img`
  max-height: 600px;
  max-width: 80%;
  object-fit: contain;
`;
