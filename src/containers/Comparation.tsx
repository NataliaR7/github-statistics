import { connect } from 'react-redux';
import Comparation from '../pages/Comparation/Comparation';
import { setCompareNickname } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState) => ({
        compareNickname: state.compareNickname,
    }),
    (dispatch) => ({
        setCompareNickname: (value: string) => dispatch(setCompareNickname(value))
    })
)(Comparation);