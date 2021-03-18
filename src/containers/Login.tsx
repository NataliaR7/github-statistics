import React from 'react';
import { connect } from 'react-redux';
import Login from '../pages/Login/Login';
import { signIn } from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        isLoggedIn: state.isLoggedIn,
    }),
    (dispatch, props) => ({
        toLoggedIn: (value: boolean) => dispatch(signIn(value)),
    })
)(Login);