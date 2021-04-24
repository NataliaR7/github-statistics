import React from 'react';
import { connect } from 'react-redux';
import UserPanel from '../components/UserPanel/UserPanel';
import { setCompareNickname} from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
    }),
    (dispatch, props) => ({
        setCompareNickname: (value: string) => dispatch(setCompareNickname(value))
    })
)(UserPanel);