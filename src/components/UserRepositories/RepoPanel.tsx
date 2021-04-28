import './UserRepositories.css';
import RepoBall from '../../containers/RepoBall';
import RepoSquare from '../../components/UserRepositories/RepoSquare';
import { useEffect, useState } from 'react';
import { sortReposData } from '../../generalLogic/repositoryLogic';

interface PropsType {
    type: "ball" | "square";
    username?: string;
}

interface RepoDataType {
    id: number;
    starsCount: number;
    repoName: string;
    isFork: boolean;
    updateDate: Date;
    cloneUrl: string;
};

const RepoPanel: React.FC<PropsType> = props => {
    const [repoData, setRepoData] = useState<Array<RepoDataType>>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        loadReposData(props.username).then((res) => {
            setRepoData(repoData => repoData = res);
            setIsLoadedData(true);
        });
    }, []);

    return (
        <>
            {isLoadedData &&
                <div className={`${props.type}s`}>
                    {repoData.length === 0
                        ? <span className="warning">This user has no repositories</span>
                        : <>
                            {fillRepos(repoData, props.type)}
                        </>
                    }
                </div>
            }
        </>
    );
}

async function loadReposData(username?: string) {
    const queryUsername = username ? "?username=" + username : "";
    const repositories = await fetch(`/repos${queryUsername}`);
    const response = await repositories.json();
    const sortPeros = sortReposData(response).slice(0, 5);

    const stylizedRepo = sortPeros.map(repo => {
        return {
            id: repo.id,
            starsCount: repo.stargazers_count,
            repoName: repo.name,
            isFork: repo.fork,
            updateDate: new Date(repo.pushed_at || repo.created_at),
            cloneUrl: repo.clone_url,
        }
    });

    return stylizedRepo;
}

function fillRepos (repoData: RepoDataType[], type: string) {
    const result = [];
    for (let i = 0; i < 5; i++) {
        type === "ball"
            ? repoData[i] && result.push(<RepoBall data={repoData[i]} />)
            : repoData[i] && result.push(<RepoSquare data={repoData[i]} />);
    }
    return result;
}

export default RepoPanel;