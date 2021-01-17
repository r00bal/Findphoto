import styled from 'styled-components/macro';
import backgroundImage from '../assets/bg.jpg';
import { Header, Search } from '../components';

const Wrapper = styled.div`
  ${({ backgroundImage }) => (backgroundImage ? `background-image: url(${backgroundImage});` : null)}
  margin-top:100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
`;

const Container = styled.section`
  width: 66.66667%;
  max-width: 800px;
  padding: 100px 12px 100px 12px;
`;

function Home() {
  return (
    <>
      <Wrapper backgroundImage={backgroundImage}>
        <Container>
          <Header>
            <Header.Title> Unsplash</Header.Title>
            <Header.Text>
              The internet’s source of freely-usable images.
              <br />
              Powered by creators everywhere.
            </Header.Text>
          </Header>
          <Search />
        </Container>
      </Wrapper>
    </>
  );
}

export default Home;
