import * as actionTypes from '../actionTypes';

export const navigateTo = (activePage: string) => ({
  type: actionTypes.NAVIGATE_TO_PAGE,
  activePage
});