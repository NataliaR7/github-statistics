import React from 'react';
import { connect } from 'react-redux';
import NicknameInput from '../pages/NicknameInput/NicknameInput';
import { changeNickname, resetStore} from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        currentNickname: state.currentNickname,
    }),
    (dispatch, props) => ({
        setNickname: (value: string) => dispatch(changeNickname(value)),
        resetStore: () => dispatch(resetStore()),
    })
)(NicknameInput);