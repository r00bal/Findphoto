/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks';
import { BASE_API_URL_DATAMUSE } from '../../constant';
import { Form, Input, List, Option, InputWrapper, Box } from './styles/Autocomplete';

function Autocomplete({ placeholder = 'Search free high resolution photos', onSubmit, secondary, ...restProps }) {
  const location = useLocation();
  const { photo } = useParams();
  const [{ data }, setUrl] = useFetch(null);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    console.log(location.pathname.includes('/search/'));
    if (location.pathname.includes('/search/')) {
      setQuery(photo);
    }
  }, []);

  useEffect(() => {
    if (query) {
      if (query.length > 3 && search !== query && photo !== query) {
        setUrl(`${BASE_API_URL_DATAMUSE}?s=${query}`);
      } else {
        setSuggestions('');
      }
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      const topFiveSuggestions = data.sort((a, b) => b.score - a.score).slice(0, 5);
      if (topFiveSuggestions.length > 0) {
        setSuggestions(topFiveSuggestions.map(({ word }) => word));
      } else {
        setSuggestions('No results found');
      }
    }
  }, [data]);

  useEffect(() => {
    if (search && search === query) {
      setSuggestions('');
      onSubmit(search);
    }
  }, [search]);

  const handleFormSubmit = () => {
    setSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleFormSubmit();
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setUrl(val);
  };

  const handleOptionClick = (e) => {
    const val = e.target.innerText;
    setQuery(val);
    setSearch(val);
  };

  const empty = suggestions.length === 0;

  return (
    <Form {...restProps} secondary={secondary} onSubmit={handleFormSubmit}>
      <InputWrapper secondary={secondary}>
        <Box />
        <Input
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={query}
          type="text"
          placeholder={placeholder}
          secondary={secondary}
        />
      </InputWrapper>

      {suggestions.length > 0 && suggestions instanceof Array ? (
        <List empty={empty} role="listbox">
          {suggestions.map((suggestion, index) => (
            <Option
              className={index === active && 'active'}
              ariaSelected={index === active}
              role="option"
              key={suggestion}
              value={suggestion}
              onClick={handleOptionClick}
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

Autocomplete.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  background: PropTypes.string,
  secondary: PropTypes.bool,
};

export default Autocomplete;
