import React from 'react';
import { connect } from 'react-redux';
import Tab from '../components/TabBar/Tab';
import { navigateTo } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        activePage: state.activePage,
    }),
    (dispatch, props) => ({
        onNavigate: (value: string) => dispatch(navigateTo(value)),
    })
)(Tab);