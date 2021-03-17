import './UserRepositories.css';
import RepoBall from './RepoBall'

function UserRepositories() {
    return (
      <div className="userRepositories">
        <div className="head">
          <span>repositories</span>
        </div>
        <RepoBall />
      </div>
    );
  }
  
  export default UserRepositories;