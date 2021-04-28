import { connect } from 'react-redux';
import NavigationPagePanel from '../pages/Repositories/NavigationPagePanel';
import { changeReposPage } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState) => ({
        currentReposPage: state.currentReposPage,
    }),
    (dispatch) => ({
        setCurrentPage: (value: number) => dispatch(changeReposPage(value)),
    })
)(NavigationPagePanel);