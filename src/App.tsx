import './App.css';
import General from './pages/General/General';
import NicknameInput from './containers/NicknameInput';
import Login from './containers/Login';
import ErrorNotFound from './pages/ErrorNotFound/ErrorNotFound';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {store} from './store';

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
            {/* {!!Cookies.get('isLoggedIn') ?
              <Redirect exact from="/" to="/main" /> :
              <Redirect exact from="/" to="/login" />} */}
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <Route path="/nickname" component={NicknameInput} />
            <Route path="/notFound" component={ErrorNotFound} />
            <Route path="/" component={General} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
