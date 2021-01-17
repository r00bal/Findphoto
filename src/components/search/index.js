/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { PhotosContext } from '../../context/PhotosContext';
import { Form, Input, List, Option } from './styles/Search';

function Search({ placeholder = 'Search free high resolution photos' }) {
  const history = useHistory();
  const [photos, setPhotos] = useContext(PhotosContext);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [query, setQuery] = useState([]);
  const [activeOption, setActiveOption] = useState(-1);

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

  const fetchResults = async () => {
    try {
      const res = await axios(
        `https://api.unsplash.com/search/photos?query=${search}&per_page=10&client_id=${process.env.REACT_APP_APIKEY}`
      );
      const { results } = res.data;
      if (results.length === 0) {
        setSuggestions('No results found');
      } else {
        setPhotos(results);
        history.push(`search/${search}`);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (query.length >= 3) {
      fetchSuggestions();
    } else {
      setSuggestions('');
    }
  }, [query]);

  useEffect(() => {
    if (query.length > 0 && search.length > 0) {
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
    <Form>
      <Input
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder={placeholder}
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
  );
}

export default Search;
