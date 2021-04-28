import { connect } from 'react-redux';
import TabBar from '../components/TabBar/TabBar';
import { navigateTo } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState, props) => ({
        activePage: state.activePage,
    }),
    (dispatch, props) => ({
        onNavigate: (value: string) => dispatch(navigateTo(value))
    })
)(TabBar);