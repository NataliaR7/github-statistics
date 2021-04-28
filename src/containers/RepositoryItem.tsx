import React from 'react';
import { connect } from 'react-redux';
import RepositoryItem from '../components/RepositoryItem/RepositoryItem';
import { setRepoActive } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        // activeRepoId: state.activeRepoId,
        // isRepoActive: state.isRepoActive,
    }),
    (dispatch, props) => ({
        selectRepo: (value: number) => dispatch(setRepoActive(value)),
    })
)(RepositoryItem);