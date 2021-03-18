import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

export const rootReducer = combineReducers({
    //userHead: userHeadReducer,
    activePage: tabsReducer,
    isLoggedIn: loginReducer
});

type actionType = {
    type: string;
    activePage: string;
    isLoggedIn: boolean;
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

export type RootState = ReturnType<typeof rootReducer>