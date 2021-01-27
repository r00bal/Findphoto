import { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';

export default function useFetch(initURL = null, infinite = false) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(initURL);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios(url);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (url) {
      fetchData();
    }
  }, [url]);

  return [{ isLoading, data, isError }, setUrl];
}
