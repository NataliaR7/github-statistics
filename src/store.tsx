import { createStore } from 'redux';
import { rootReducer } from './reducers';

type StateType = {
    activePage: string,
    isLoggedIn: boolean,
    currentNickname: string,
};

const preloadedState: StateType = {
    activePage: "/login",
    isLoggedIn: false,
    currentNickname: ""
};

const store = createStore(rootReducer, preloadedState);
export default store;