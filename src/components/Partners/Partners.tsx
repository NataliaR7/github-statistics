import './Partners.css';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import Contributor from './Contributor'

function Partners() {
    const [contributorsData, setContributorsData] = useState<Array<{
        count: number,
        name: string,
        avatar: string,
        url: string
    }>>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    const loadData = async () => {
        const repoAdditionalInfo = await fetch('/repoAdditionalInfo');
        return await repoAdditionalInfo.json();
    }

    const getActiveContributors = (source: any[]) => {
        console.log(source, "source");
        const contributors: Map<number, { count: number, name: string, avatar: string, url: string }> = new Map();
        source.forEach((repo: any) => {
            console.log(repo, "repo");
            const currentUser = repo.contributors && repo.contributors.find((e: any) => `${e.login}`.toLowerCase() === Cookies.get('currentNickname')?.toLowerCase());
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

    const fillContributors = () => {
        return contributorsData.map(e => {
            return <Contributor data={e} />
        });
    }



    useEffect(() => {
        loadData().then((res) => {
            const contributors = getActiveContributors(res);
            const contCount = contributors.length;
            setContributorsData(cont => cont = contributors.slice(0, contCount <= 5 ? contCount : 5));
            console.log(contributors, "contributors");
            console.log(contributorsData, "contributorsData");
            setIsLoadedData(true);
        });
    }, []);

    return (
        <div className="partners">
            <div className="head">
                <span>work partners</span>
            </div>
            <div className="people">
                {contributorsData.length === 0
                    ? <span className="warning">No frequent work partners</span>
                    : isLoadedData && fillContributors()}
            </div>
        </div>
    );
}

export default Partners;
