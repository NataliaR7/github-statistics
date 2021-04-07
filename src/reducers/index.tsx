import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

export const rootReducer = combineReducers({
    //userHead: userHeadReducer,
    activePage: tabsReducer,
    isLoggedIn: loginReducer,
    currentNickname: nicknameReducer,
    activeRepoId: repoIdReducer,
    isRepoActive: repoActiveReducer,
    currentReposPage: repoPageReducer,
});

type actionType = {
    type: string;
    activePage: string;
    isLoggedIn: boolean;
    currentNickname: string;
    activeRepoId: number;
    isRepoActive: boolean;
    currentReposPage: number;
  };

function tabsReducer(state = '/main', action: actionType) {
    switch (action.type) {
        case actionTypes.NAVIGATE_TO_PAGE:
            return action.activePage;
    }
    return state;
}

function loginReducer(state = false, action: actionType) {
    switch (action.type) {
        case actionTypes.LOGIN:
            return action.isLoggedIn;
    }
    return state;
}

function nicknameReducer(state = "", action: actionType) {
    switch (action.type) {
        case actionTypes.CHANGE_CURR_NICKNAME:
            return action.currentNickname;
    }
    return state;
}
function repoIdReducer(state = 0, action: actionType) {
    switch (action.type) {
        case actionTypes.SET_REPO_ACTIVE: {
            return action.activeRepoId;
        }
    }
    return state;
}
function repoActiveReducer(state = false, action: actionType) {
    switch (action.type) {
        case actionTypes.SET_REPO_ACTIVE: {
            return true;
        }
    }
    return state;
}
function repoPageReducer(state = 1, action: actionType) {
    switch (action.type) {
        case actionTypes.CHANGE_CURR_REPOS_PAGE: {
            return action.currentReposPage;
        }
    }
    return state;
}




export type RootState = ReturnType<typeof rootReducer>