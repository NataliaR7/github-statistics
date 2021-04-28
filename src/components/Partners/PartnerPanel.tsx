import './Partners.css';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Contributor from './Contributor'

interface PropsType {
    username?: string;
}
interface ContributorsDataType {
    count: number,
    name: string,
    avatar: string,
    url: string
}

const PartnerPanel: React.FC<PropsType> = props => {
    const [contributorsData, setContributorsData] = useState<Array<ContributorsDataType>>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        loadData(props.username).then((res) => {
            const contributors = getActiveContributors(res, props.username);
            const contrCount = contributors.length;
            setContributorsData(value => value = contributors.slice(0, contrCount <= 5 ? contrCount : 5));
            setIsLoadedData(true);
        });
    }, []);

    return (
        <div className="partnerPanel">
            {contributorsData.length === 0
                ? <span className="warning">No frequent work partners</span>
                : isLoadedData && fillContributors(contributorsData)}
        </div>
    );
}

async function loadData(username?: string) {
    const queryUsername = username ? "?username=" + username : "";
    const repoAdditionalInfo = await fetch(`/repoAdditionalInfo${queryUsername}`);
    return await repoAdditionalInfo.json();
}

function getActiveContributors(source: any[], username?: string) {
    const contributors: Map<number, { count: number, name: string, avatar: string, url: string }> = new Map();
    source.forEach((repo: any) => {
        const currentUser = repo.contributors && repo.contributors.find((user: any) => isUsersEqual(user.login, username));
        if (!currentUser) {
            return;
        }
        repo.contributors.forEach((people: any) => {
            if (people.type !== "User") {
                return;
            }
            if (!contributors.has(people.id)) {
                if (`${people.login}`.toLowerCase() === `${currentUser.login}`.toLowerCase()) {
                    return;
                }
                contributors.set(people.id, {
                    count: 1,
                    name: people.login,
                    avatar: people.avatar_url,
                    url: people.html_url
                });
                return;
            }
            let currentPeople = contributors.get(people.id);
            currentPeople && currentPeople.count++;
        });
    });
    const result = [...contributors.values()].sort((a, b) => b.count - a.count);
    return result.filter(e => e.count > 1);
}

function isUsersEqual(firstUser: string, secondUser?: string) {
    return firstUser.toLowerCase() === (secondUser || Cookies.get('currentNickname')?.toLowerCase());
}

function fillContributors(contributorsData: ContributorsDataType[]) {
    return contributorsData.map(people => {
        return <Contributor data={people} />
    });
}

export default PartnerPanel;
