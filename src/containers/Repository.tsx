import { connect } from 'react-redux';
import Repository from '../pages/Repository/Repository';
import { RootState } from '../stateManage/reducers';
import { deactiveteRepo } from '../stateManage/actionCreators';

export default connect(
    (state: RootState, props) => ({
        activeRepoId: state.activeRepoId,
        isRepoActive: state.isRepoActive
    }),
    (dispatch, props) => ({
        deactiveteRepo: () => dispatch(deactiveteRepo()),
    })
)(Repository);