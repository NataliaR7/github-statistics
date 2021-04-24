import { connect } from 'react-redux';
import RepoBall from '../components/UserRepositories/RepoBall';
import { setRepoActive } from '../actionCreators';
import { RootState } from '../reducers';

export default connect(
    (state: RootState, props) => ({
        isRepoActive: state.isRepoActive
    }),
    (dispatch, props) => ({
        selectRepo: (value: number) => dispatch(setRepoActive(value))
    })
)(RepoBall);