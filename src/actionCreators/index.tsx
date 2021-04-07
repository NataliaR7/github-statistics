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

export const setRepoActive = (activeRepoId: number) => ({
  type: actionTypes.SET_REPO_ACTIVE,
  activeRepoId
});

export const changeReposPage = (currentReposPage: number) => ({
  type: actionTypes.CHANGE_CURR_REPOS_PAGE,
  currentReposPage
});