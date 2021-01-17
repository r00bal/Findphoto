/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import { PhotosContext } from './context/PhotosContext';

function App() {
  const [photos, setPhotos] = useState(null);
  return (
    <PhotosContext.Provider value={[photos, setPhotos]}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search/:photo" component={Gallery} />
        </Switch>
      </Router>
    </PhotosContext.Provider>
  );
}

export default App;
