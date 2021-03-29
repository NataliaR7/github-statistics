import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

export const rootReducer = combineReducers({
    //userHead: userHeadReducer,
    activePage: tabsReducer,
    isLoggedIn: loginReducer,
    currentNickname: nicknameReducer,
});

type actionType = {
    type: string;
    activePage: string;
    isLoggedIn: boolean;
    currentNickname: string;
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




export type RootState = ReturnType<typeof rootReducer>