import * as actionTypes from '../actionTypes';

export const navigateTo = (activePage: string) => ({
  type: actionTypes.NAVIGATE_TO_PAGE,
  activePage
});

export const signIn  = (isLoggedIn: boolean) => ({
  type: actionTypes.LOGIN,
  isLoggedIn
});

export const changeNickname = (currentNickname: string) => ({
  type: actionTypes.CHANGE_CURR_NICKNAME,
  currentNickname
});