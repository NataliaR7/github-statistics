import { combineReducers, CombinedState, Reducer } from 'redux';
import * as actionTypes from './actionTypes';
import { preloadedState } from './store'


export const rootReducer = (state?: RootState, action?: any)  => {
    if (action.type === actionTypes.RESET_STORE) {
        return preloadedState;
      }
    return appReducer(state, action)
}

const appReducer = combineReducers({
    activePage: tabsReducer,
    activeRepoId: repoIdReducer,
    isRepoActive: repoActiveReducer,
    currentReposPage: repoPageReducer,
    compareNickname: compareNicknameReducer,
});

interface actionType {
    type: string;
    activePage: string;
    activeRepoId: number;
    isRepoActive: boolean;
    currentReposPage: number;
    compareNickname: string;
};

function tabsReducer(state = '/main', action: actionType) {
    switch (action.type) {
        case actionTypes.NAVIGATE_TO_PAGE:
            return action.activePage;
        case actionTypes.SET_REPO_ACTIVE: {
            return "/repos";
        }
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
        case actionTypes.DEACTIVATE_REPO: {
            return false;
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
function compareNicknameReducer(state = "", action: actionType) {
    switch (action.type) {
        case actionTypes.SET_COMPARE_NICKNAME: {
            return action.compareNickname;
        }
    }
    return state;
}




export type RootState = ReturnType<typeof appReducer>