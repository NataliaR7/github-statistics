import React from 'react';
import './App.css';
import TabBar from './components/TabBar/TabBar';
import UserPanel from './components/UserPanel/UserPanel';
import MainInfo from './pages/MainInfo/MainInfo';
import Repositories from './pages/Repositories/Repositories';
import { rootReducer } from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

type StateType = {
  activePage: string,
};

const preloadedState: StateType = {
  activePage: "/main",
};

const store = createStore(rootReducer, preloadedState);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
