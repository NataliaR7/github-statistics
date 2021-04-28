import { connect } from 'react-redux';
import Repositories from '../pages/Repositories/Repositories';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState) => ({
        activeRepoId: state.activeRepoId,
        isRepoActive: state.isRepoActive,
        currentReposPage: state.currentReposPage,
    })
)(Repositories);