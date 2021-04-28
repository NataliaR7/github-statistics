import { connect } from 'react-redux';
import UserPanel from '../components/UserPanel/UserPanel';
import { setCompareNickname } from '../stateManage/actionCreators';

export default connect(
    () => ({}),
    (dispatch) => ({
        setCompareNickname: (value: string) => dispatch(setCompareNickname(value))
    })
)(UserPanel);