import { combineReducers } from 'redux';
import * as actionTypes from '../actionTypes';

export const rootReducer = combineReducers({
    //userHead: userHeadReducer,
    activePage: tabsReducer
});

type actionType = {
    type: string;
    activePage: string;
  };

function tabsReducer(state = '/main', action: actionType) {
    switch (action.type) {
        case actionTypes.NAVIGATE_TO_PAGE:
            return action.activePage;
    }
    return state;
}

export type RootState = ReturnType<typeof rootReducer>