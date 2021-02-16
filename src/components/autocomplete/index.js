/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import MagnifyingGlassier from '../../assets/svg/magnifyingGlass';
import { useFetch } from '../../hooks';
import { BASE_API_URL_DATAMUSE } from '../../constant';
import { Form, Input, List, Option, InputWrapper, Button } from './styles/Autocomplete';

function Autocomplete({ placeholder = 'Search free high resolution photos', onSubmit, secondary, ...restProps }) {
  const location = useLocation();
  const { photo } = useParams();
  const [{ data }, setUrl] = useFetch(null);
  const [active, setActive] = useState(-1);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState('');

  useEffect(() => {
    if (location.pathname.includes('/search/')) {
      setQuery(photo);
    }
  }, [photo]);

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
    if (suggestions.length > 0 && suggestions instanceof Array) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [suggestions]);

  useEffect(() => {
    if (data) {
      const topFiveSuggestions = data.sort((a, b) => b.score - a.score).slice(0, 5);
      if (topFiveSuggestions.length > 0) {
        setSuggestions(topFiveSuggestions.map(({ word }) => word));
      } else {
        setSuggestions([]);
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
    if (e.keyCode === 9 || e.keyCode === 27) {
      setIsOpen(false);
      setActive(-1);
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      if (isOpen && active > -1) {
        setQuery(suggestions[active]);
        setSearch(suggestions[active]);
      } else {
        handleFormSubmit();
      }
    }

    if (!isOpen && suggestions.length > 0 && active === -1 && e.keyCode === 40) {
      setIsOpen(true);
      setActive(0);
    }

    if (isOpen && e.keyCode === 40) {
      active === -1 ? setActive(0) : null;

      if (active > -1) {
        setActive((prev) => prev + 1);
      }
      if (active === suggestions.length - 1) {
        setActive(0);
      }
    }

    if (isOpen && e.keyCode === 38) {
      if (active === -1) {
        return;
      }
      if (active === 0) {
        setActive(suggestions.length - 1);
        setIsOpen(false);
        setActive(-1);
      }
      if (active > 0) {
        setActive((prev) => prev - 1);
      }
    }
  };

  const handleOptionHover = (e) => {
    setActive(suggestions.indexOf(e.target.textContent));
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
  // const isOpen = suggestions.length > 0 && suggestions instanceof Array;
  return (
    <Form {...restProps} secondary={secondary} onSubmit={handleFormSubmit}>
      <InputWrapper {...restProps} secondary={secondary}>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleFormSubmit();
          }}
        >
          <MagnifyingGlassier color="#767676" />
        </Button>
        <Input
          {...restProps}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          value={query}
          type="text"
          placeholder={placeholder}
          secondary={secondary}
          role="combobox"
          aria-autocomplete="both"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-owns="suggestionsBox"
          aria-activedescendant={`option-${active}`}
        />
      </InputWrapper>

      {isOpen ? (
        <List id="suggestionsBox" empty={empty} role="listbox" aria-label="Suggestions">
          {suggestions &&
            suggestions.map((suggestion, index) => (
              <Option
                id={`option-${index}`}
                className={index === active && 'active'}
                ariaSelected={index === active}
                role="option"
                key={suggestion}
                value={suggestion}
                onClick={handleOptionClick}
                onMouseEnter={handleOptionHover}
              >
                {suggestion}
              </Option>
            ))}
        </List>
      ) : null}
    </Form>
  );
}

Autocomplete.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  background: PropTypes.string,
  secondary: PropTypes.bool,
  initQuery: PropTypes.string,
};

export default Autocomplete;
