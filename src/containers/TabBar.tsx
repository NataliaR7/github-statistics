import React from 'react';
import { connect } from 'react-redux';
import TabBar from '../components/TabBar/TabBar';
import { navigateTo,  resetStore} from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        activePage: state.activePage,
    }),
    (dispatch, props) => ({
        onNavigate: (value: string) => dispatch(navigateTo(value))
    })
)(TabBar);