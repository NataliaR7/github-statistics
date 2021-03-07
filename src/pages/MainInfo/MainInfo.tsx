import './MainInfo.css';
import UserLanguages from '../../components/UserLanguages/UserLanguages';
import UserActivity from '../../components/UserActivity/UserActivity';
import UserRecentActivity from '../../components/UserRecentActivity/UserRecentActivity';
import UserRepositories from '../../components/UserRepositories/UserRepositories';

function MainInfo() {
    return (
        <div className="mainInfo">
        <UserLanguages />
        <UserActivity />
        <UserRecentActivity />
        <UserRepositories />
        </div>
    );
}

export default MainInfo;