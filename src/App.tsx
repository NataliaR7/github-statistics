import React, { useEffect } from 'react';
import './App.css';
import General from './pages/General/General';
import Login from './containers/Login';
import { rootReducer } from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import store from './store'

// type StateType = {
//   activePage: string,
//   isLoggedIn: boolean
// };

// const preloadedState: StateType = {
//   activePage: "/login",
//   isLoggedIn: false
// };

// const store = createStore(rootReducer, preloadedState);

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            {!(store.getState().isLoggedIn) && <Redirect exact from="/" to="/main" />}
            <Route path="/login" component={Login} />
            <Route path="/main" component={General} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
