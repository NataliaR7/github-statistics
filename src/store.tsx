import { createStore } from 'redux';
import { rootReducer } from './reducers';

type StateType = {
    activePage: string,
    isLoggedIn: boolean,
    currentNickname: string,
    activeRepoId: number,
    isRepoActive: boolean,
    compareNickname: string,
    currentReposPage: number
};

const preloadedState: StateType = {
    activePage: "/main",
    isLoggedIn: false,
    currentNickname: "",
    activeRepoId: 0,
    isRepoActive: false,
    compareNickname: "",
    currentReposPage: 1
};

const store = createStore(rootReducer, preloadedState);
export default store;