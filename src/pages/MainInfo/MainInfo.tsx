import './MainInfo.css';
import UserLanguages from '../../components/UserLanguages/UserLanguages';
import ActivityChart from '../../components/UserActivity/ActivityChart';
import RecentActivityPanel from '../../components/RecentActivity/RecentActivityPanel';
import RepoPanel from '../../components/RepoPanel/RepoPanel';
import PartnerPanel from '../../components/Partners/PartnerPanel';
import Title from '../../components/Title/Title';

const MainInfo: React.FC = () => {
    return (
        <main className="mainInfo">
            <div className="userLanguages">
                <Title title="languages" />
                <UserLanguages width="500" height="300" />
            </div>
            <div className="partners">
                <Title title="work partners" />
                <PartnerPanel />
            </div>
            <div className="userActivity">
                <Title title="contributions" />
                <ActivityChart />
            </div>
            <div className="userRecentActivity">
                <Title title="recent activity" />
                <RecentActivityPanel type="user" />
            </div>
            <div className="userRepositories">
                <Title title="repositories" />
                <RepoPanel type="ball" />
            </div>
        </main>
    );
}

export default MainInfo;