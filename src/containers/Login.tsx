import React from 'react';
import { connect } from 'react-redux';
import Login from '../pages/Login/Login';
import { signIn } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        isLoggedIn: state.isLoggedIn,
    }),
    (dispatch, props) => ({
    })
)(Login);