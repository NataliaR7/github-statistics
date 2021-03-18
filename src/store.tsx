import { createStore } from 'redux';
import { rootReducer } from './reducers';

type StateType = {
    activePage: string,
    isLoggedIn: boolean
};

const preloadedState: StateType = {
    activePage: "/login",
    isLoggedIn: false
};

const store = createStore(rootReducer, preloadedState);
export default store;