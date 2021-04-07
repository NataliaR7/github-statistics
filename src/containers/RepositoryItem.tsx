import React from 'react';
import { connect } from 'react-redux';
import RepositoryItem from '../components/RepositoryItem/RepositoryItem';
import { setRepoActive } from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        // activeRepoId: state.activeRepoId,
        // isRepoActive: state.isRepoActive,
    }),
    (dispatch, props) => ({
        selectRepo: (value: number) => dispatch(setRepoActive(value)),
    })
)(RepositoryItem);