import * as actionTypes from './actionTypes';

export const navigateTo = (activePage: string) => ({
  type: actionTypes.NAVIGATE_TO_PAGE,
  activePage
});

export const setRepoActive = (activeRepoId: number) => ({
  type: actionTypes.SET_REPO_ACTIVE,
  activeRepoId
});

export const deactiveteRepo = () => ({
  type: actionTypes.DEACTIVATE_REPO
});

export const changeReposPage = (currentReposPage: number) => ({
  type: actionTypes.CHANGE_CURR_REPOS_PAGE,
  currentReposPage
});

export const resetStore = () => ({
  type: actionTypes.RESET_STORE
});

export const setCompareNickname = (compareNickname: string) => ({
  type: actionTypes.SET_COMPARE_NICKNAME,
  compareNickname
});