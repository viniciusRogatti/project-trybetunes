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
          <Route exact path="/project-trybetunes/" component={ Login } />
          <Route exact path="/project-trybetunes/home" component={ Home } />
          <Route exact path="/project-trybetunes/search" component={ Search } />
          <Route exact path="/project-trybetunes/album/:id" component={ Album } />
          <Route exact path="/project-trybetunes/favorites" component={ Favorites } className="root" />
          <Route exact path="/project-trybetunes/profile" component={ Profile } />
          <Route exact path="/project-trybetunes/profile/edit" component={ EditProfile } />
          <Route component={ NotFound } />
        </Switch>
      </main>
    );
  }
}

export default App;