import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <main className="body">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/home" component={ Home } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } className="root" />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ EditProfile } />
          <Route component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;