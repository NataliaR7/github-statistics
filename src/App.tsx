import React from 'react';
import './App.css';
import TabBar from './components/TabBar/TabBar';
import UserPanel from './components/UserPanel/UserPanel';
import MainInfo from './pages/MainInfo/MainInfo';
import Repositories from './pages/Repositories/Repositories';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <TabBar />
        <UserPanel />

        <Switch>
          <Redirect exact from="/" to="/main" />
          <Route path="/main" component={MainInfo} />
          <Route path="/about" />
          <Route path="/repo" component={Repositories} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
