import { connect } from 'react-redux';
import Repository from '../pages/Repository/Repository';
import { RootState } from '../stateManage/reducers';
import { deactiveteRepo } from '../stateManage/actionCreators';

export default connect(
    (state: RootState) => ({
        activeRepoId: state.activeRepoId,
        isRepoActive: state.isRepoActive
    }),
    (dispatch) => ({
        deactiveteRepo: () => dispatch(deactiveteRepo()),
    })
)(Repository);