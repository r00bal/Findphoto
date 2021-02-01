import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import backgroundImageL from '../assets/largeBg.jpg';
import backgroundImageS from '../assets/smllBg.jpg';
import { useProgressiveImg } from '../hooks';
import { Header, Autocomplete } from '../components';

const Wrapper = styled.div`
  position: relative;
  margin-top: 100px;

  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  &:before {
    will-change: filter;
    ${({ backgroundImage }) => (backgroundImage ? `background-image: url(${backgroundImage});` : null)}
    ${({ blur }) => (blur ? `filter: blur(5px);` : null)}
    transition: filter 0.5s ease-out;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;

const Container = styled.section`
  width: 66.66667%;
  max-width: 800px;
  padding: 100px 12px 100px 12px;
`;

function Home() {
  const history = useHistory();
  const [search, setSearch] = useState(null);
  const [src, { blur }] = useProgressiveImg(backgroundImageS, backgroundImageL);
  useEffect(() => {
    if (search) {
      history.push(`/search/${search}`);
    }
  }, [search]);
  return (
    <>
      <Wrapper backgroundImage={src} blur={blur}>
        <Container>
          <Header>
            <Header.Title> Unsplash</Header.Title>
            <Header.Text>
              The internet’s source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </Header.Text>
          </Header>
          {!blur && <Autocomplete onSubmit={setSearch} bg="#FFFFFF" />}
        </Container>
      </Wrapper>
    </>
  );
}

export default Home;
