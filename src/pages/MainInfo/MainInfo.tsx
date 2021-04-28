import './MainInfo.css';
import UserLanguages from '../../components/UserLanguages/UserLanguages';
import ActivityChart from '../../components/UserActivity/ActivityChart';
import RecentActivityPanel from '../../components/UserRecentActivity/RecentActivityPanel';
import RepoPanel from '../../components/UserRepositories/RepoPanel';
import PartnerPanel from '../../components/Partners/PartnerPanel';
import Head from '../../components/Head/Head';

const MainInfo: React.FC = () => {
    return (
        <div className="mainInfo">
            <div className="userLanguages">
                <Head title="languages" />
                <UserLanguages width="500" height="300" />
            </div>
            <div className="partners">
                <Head title="work partners" />
                <PartnerPanel />
            </div>
            <div className="userActivity">
                <Head title="contributions" />
                <ActivityChart />
            </div>
            <div className="userRecentActivity">
                <Head title="recent activity" />
                <RecentActivityPanel type="user" />
            </div>
            <div className="userRepositories">
                <Head title="repositories" />
                <RepoPanel type="ball" />
            </div>
        </div>
    );
}

export default MainInfo;