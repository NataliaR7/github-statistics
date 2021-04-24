import { createStore } from 'redux';
import { rootReducer } from './reducers';

type StateType = {
    activePage: string,
    isLoggedIn: boolean,
    currentNickname: string,
    activeRepoId: number,
    isRepoActive: boolean,
    currentReposPage: number,
    compareNickname: string,
};

export const preloadedState: StateType = {
    activePage: "/main",
    isLoggedIn: false,
    currentNickname: "",
    activeRepoId: 0,
    isRepoActive: false,
    currentReposPage: 1,
    compareNickname: "",
};

export const store = createStore(rootReducer, preloadedState);
