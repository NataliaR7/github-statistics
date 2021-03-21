import './UserRepositories.css';
import RepoBall from './RepoBall'

function UserRepositories() {
  return (
    <div className="userRepositories">
      <div className="head">
        <span>repositories</span>
      </div>
      <div className="balls">
        <RepoBall />
        <RepoBall />
        <RepoBall />
        <RepoBall />
        <RepoBall />
      </div>
    </div>
  );
}

export default UserRepositories;