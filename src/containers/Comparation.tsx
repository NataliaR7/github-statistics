import React from 'react';
import { connect } from 'react-redux';
import Comparation from '../pages/Comparation/Comparation';
import { setCompareNickname} from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        compareNickname: state.compareNickname,
    }),
    (dispatch, props) => ({
        setCompareNickname: (value: string) => dispatch(setCompareNickname(value))
    })
)(Comparation);