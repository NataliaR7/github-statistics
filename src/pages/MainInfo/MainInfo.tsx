import './MainInfo.css';
import UserLanguages from '../../components/UserLanguages/UserLanguages';
import UserActivity from '../../components/UserActivity/UserActivity';
import UserRecentActivity from '../../components/UserRecentActivity/UserRecentActivity';
import UserRepositories from '../../components/UserRepositories/UserRepositories';

function MainInfo() {
    const activityData = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 9,
        h: 7,
        i: 8,
        k: 10,
        l: 11,
        m: 12,
    };
    const languagesData = { "c#": 5, "ht": 3, "gh": 7, "js": 2 }
    return (
        <div className="mainInfo">
            <UserLanguages data={languagesData} />
            <UserActivity data={activityData} />
            <UserRecentActivity />
            <UserRepositories />
        </div>
    );
}

export default MainInfo;