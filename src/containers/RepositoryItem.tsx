import { connect } from 'react-redux';
import RepositoryItem from '../components/RepositoryItem/RepositoryItem';
import { setRepoActive } from '../stateManage/actionCreators';

export default connect(
    () => ({}),
    (dispatch) => ({
        selectRepo: (value: number) => dispatch(setRepoActive(value)),
    })
)(RepositoryItem);