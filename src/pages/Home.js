/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../assets/bg.jpg';
import { Header } from '../components';
import { PhotosContext } from '../context/PhotosContext';

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  background: none;
  color: #111;
`;
const Input = styled.input`
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  height: 54px;
  padding-left: 15px;
  font-size: 16px;
  display: flex;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  flex-grow: 1;
`;

const List = styled.ul`
  margin: 5px 0 0 0;
  list-style: none;
  position: absolute;
  top: 100%;
  padding: 5px 0px 5px 0px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  transition: all 0.1s ease-in-out;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  ${({ empty }) => (empty ? `display :none;` : null)}
  .active {
    background-color: #f1e1f2;
  }
`;
const Option = styled.li`
  padding: 10px 15px 10px;
  &:hover {
    background-color: #f1e1f2;
  }
`;

function Home() {
  // const navigate = useNavigate();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useContext(PhotosContext);
  const [suggestions, setSuggestions] = useState('');
  const [query, setQuery] = useState([]);
  const [activeOption, setActiveOption] = useState(-1);

  useEffect(() => {
    if (query.length >= 3) {
      const fetchSuggestions = async () => {
        try {
          const wordsResults = await axios(`https://api.datamuse.com/sug?s=${query}`);
          const sortedWordsResult = wordsResults.data.sort((a, b) => b.score - a.score).slice(0, 5);

          if (sortedWordsResult.length > 0) {
            setSuggestions(sortedWordsResult.map(({ word }) => word));
          } else {
            setSuggestions('No results found');
          }
        } catch (error) {
          console.log('error', error);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions('');
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 0 && search.length > 0) {
      const fetchResults = async () => {
        try {
          const res = await axios(
            `https://api.unsplash.com/search/photos?query=${search}&per_page=10&client_id=${process.env.REACT_APP_APIKEY}`
          );
          const { results } = res.data;
          console.log(results.length);
          if (results.length === 0) {
            setSuggestions('No results found');
          } else {
            setPhotos(results);
            history.push(`search/${search}`);
            // navigate(`/photos/${search}`);
          }
        } catch (error) {
          console.log('error', error);
        }
      };

      fetchResults();
    }
  }, [search]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setSearch(query);
    }
  };

  const empty = suggestions.length === 0;

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
          <Form>
            <Input
              onKeyDown={handleKeyDown}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              type="text"
              placeholder="Type to search"
            />
            {suggestions instanceof Array && suggestions.length > 0 ? (
              <List empty={empty} role="listbox">
                {suggestions.map((suggestion, index) => (
                  <Option
                    className={index === activeOption}
                    ariaSelected={index === activeOption}
                    role="option"
                    key={suggestion}
                    onClick={(e) => setSearch(e.currentTarget.innerText)}
                  >
                    {suggestion}
                  </Option>
                ))}
              </List>
            ) : (
              <List empty={empty} role="listbox">
                <Option role="option">{suggestions}</Option>
              </List>
            )}
          </Form>
        </Container>
      </Wrapper>
    </>
  );
}

export default Home;
