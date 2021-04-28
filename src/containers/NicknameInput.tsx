import { connect } from 'react-redux';
import NicknameInput from '../pages/NicknameInput/NicknameInput';
import { resetStore } from '../stateManage/actionCreators';

export default connect(
    () => ({}),
    (dispatch) => ({
        resetStore: () => dispatch(resetStore()),
    })
)(NicknameInput);