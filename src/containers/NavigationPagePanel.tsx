import React from 'react';
import { connect } from 'react-redux';
import NavigationPagePanel from '../pages/Repositories/NavigationPagePanel';
import { changeReposPage } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        currentReposPage: state.currentReposPage,
    }),
    (dispatch, props) => ({
        setCurrentPage: (value: number) => dispatch(changeReposPage(value)),
    })
)(NavigationPagePanel);