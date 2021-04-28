import { connect } from 'react-redux';
import RepoBall from '../components/RepoPanel/RepoBall';
import { setRepoActive } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState) => ({
        isRepoActive: state.isRepoActive
    }),
    (dispatch) => ({
        selectRepo: (value: number) => dispatch(setRepoActive(value))
    })
)(RepoBall);