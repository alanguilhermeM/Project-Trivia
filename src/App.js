import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/settings" component={ Settings } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
