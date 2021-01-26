/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
import { Route, BrowserRouter as Router, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Home from './pages/Home';
import Photos from './pages/Photos';
import { Modal } from './components';

function App() {
  // const match = useRouteMatch();
  // let location = useLocation();
  // let background = location.state && location.state.background;
  // console.log('location ', location);
  // console.log('background ', background);
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:photo" component={Photos} />
      </Switch>
    </Router>
  );
}

export default App;
