import './UserRepositories.css';
import RepoBall from '../../containers/RepoBall'
import RepoSquare from '../../components/UserRepositories/RepoSquare'
import { useEffect, useState } from 'react';
import { sortReposData } from '../../generalLogic/repositoryLogic';

type RepoDataType = {
    id: number;
    starsCount: number;
    repoName: string;
    isFork: boolean;
    updateDate: Date;
    cloneUrl: string;
};

interface PropsType {
    type: "ball" | "square";
    username?: string;
}

function RepoPanel(props: PropsType) {
    const [repoData, setRepoData] = useState<Array<RepoDataType>>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        loadReposData().then(() => {
            setIsLoadedData(true);
        })

    }, []);

    const loadReposData = async function () {
        const queryUsername = props.username ? "?username=" + props.username : "";
        const repositories = await fetch(`/repos${queryUsername}`);
        const response = await repositories.json();
        const sortPeros = sortReposData(response).slice(0, 5);

        const stylizedRepo = sortPeros.map(repo => {
            return {
                id: repo.id,
                starsCount: repo.stargazers_count,
                repoName: repo.name,
                isFork: repo.fork,
                updateDate: new Date(repo.pushed_at),
                cloneUrl: repo.clone_url,
            }
        });

        setRepoData(repoData => repoData = stylizedRepo);
    }

    const fillRepos = () => {
        const result = [];
        for (let i = 0; i < 5; i++) {
            props.type === "ball"
                ? repoData[i] && result.push(<RepoBall data={repoData[i]} />)
                : repoData[i] && result.push(<RepoSquare data={repoData[i]} />);
        }
        return result;
    }

    return (
        <>
            {isLoadedData &&
                <div className={`${props.type}s`}>
                    {repoData.length === 0
                        ? <span className="warning">This user has no repositories</span>
                        : <>
                            {fillRepos()}
                            {/* {repoData[0] && <RepoBall data={repoData[0]} />}
                            {repoData[1] && <RepoBall data={repoData[1]} />}
                            {repoData[2] && <RepoBall data={repoData[2]} />}
                            {repoData[3] && <RepoBall data={repoData[3]} />}
                            {repoData[4] && <RepoBall data={repoData[4]} />} */}
                        </>
                    }
                </div>
            }
        </>
    );
}

export default RepoPanel;