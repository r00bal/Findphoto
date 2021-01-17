/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Photos from './pages/Photos';
import { PhotosContext } from './context/PhotosContext';

function App() {
  const [photos, setPhotos] = useState(null);
  const [search, setSearch] = useState('');
  return (
    <PhotosContext.Provider value={{ photos, setPhotos, search, setSearch }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:photo" component={Photos} />
        </Switch>
      </Router>
    </PhotosContext.Provider>
  );
}

export default App;
