import React from 'react';
import { connect } from 'react-redux';
import NavigationPagePanel from '../pages/Repositories/NavigationPagePanel';
import { changeReposPage } from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        currentReposPage: state.currentReposPage,
    }),
    (dispatch, props) => ({
        setCurrentPage: (value: number) => dispatch(changeReposPage(value)),
    })
)(NavigationPagePanel);