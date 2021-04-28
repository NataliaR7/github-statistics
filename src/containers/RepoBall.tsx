import { connect } from 'react-redux';
import RepoBall from '../components/UserRepositories/RepoBall';
import { setRepoActive } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        isRepoActive: state.isRepoActive
    }),
    (dispatch, props) => ({
        selectRepo: (value: number) => dispatch(setRepoActive(value))
    })
)(RepoBall);