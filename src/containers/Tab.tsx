import { connect } from 'react-redux';
import Tab from '../components/TabBar/Tab';
import { navigateTo, deactiveteRepo } from '../stateManage/actionCreators';
import { RootState } from '../stateManage/reducers';

export default connect(
    (state: RootState) => ({
        activePage: state.activePage,
    }),
    (dispatch) => ({
        onNavigate: (value: string) => dispatch(navigateTo(value)),
        deactiveteRepo: () => dispatch(deactiveteRepo())
    })
)(Tab);