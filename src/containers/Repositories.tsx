import React from 'react';
import { connect } from 'react-redux';
import Repositories from '../pages/Repositories/Repositories';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        activeRepoId: state.activeRepoId,
        isRepoActive: state.isRepoActive,
        currentReposPage: state.currentReposPage,
    })
)(Repositories);