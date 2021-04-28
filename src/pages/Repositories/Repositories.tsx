import "./Repositories.css"
import RepositoryItem from "../../containers/RepositoryItem"
import Repository from '../../containers/Repository'
import NavigationPagePanel from '../../containers/NavigationPagePanel'
import { useEffect, useState } from 'react';
import { sortReposData } from '../../generalLogic/repositoryLogic';
import Loader from '../../components/Loader/Loader'

interface PropsType {
    activeRepoId: number;
    isRepoActive: boolean;
    currentReposPage: number;
}

interface RepoDataType {
    id: number;
    repoName: string;
    isFork: boolean;
    parentFork?: string;
    description?: string;
    generalLanguage?: string;
    contributorsCount?: number;
    forksCount?: number;
    watchersCount?: number;
    starsCount?: number;
    updateDate: Date;
    cloneUrl: string;
};

const Repositories: React.FC<PropsType> = props => {
    const [repoData, setRepoData] = useState<Array<RepoDataType>>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [isStartLoader, setIsStartLoader] = useState(false);

    useEffect(() => {
        delayToLoader();
        loadReposData().then((res) => {
            setRepoData(repoData => repoData = res);
            setIsLoadedData(true);
        });
    }, []);

    const delayToLoader = () => {
        setTimeout(() => setIsStartLoader(true), 100);
    }

    return (
        <div className="repositoriesContent">
            {props.isRepoActive
                ? <Repository />
                : <div className="repositoriesPage">
                    {!isLoadedData && isStartLoader && <Loader withoutLabel={true} />}
                    {isLoadedData && (repoData.length === 0
                        ? <span className="warning">This user has no repositories</span>
                        : <>
                            <div className="repositories">
                                {isLoadedData && fillRepositoryItems(repoData, props.currentReposPage || 1)}
                            </div>
                            {isLoadedData && <NavigationPagePanel pageCount={Math.ceil(repoData.length / 10)} />}
                        </>)
                    }
                </div>
            }
        </div>
    );
}

async function loadReposData() {
    const repositories = await (await fetch('/repos')).json();
    const repoAdditionalInfo = await (await fetch('/repoAdditionalInfo')).json();
    const sortPeros = await sortReposData(repositories);

    const stylizedRepo = sortPeros.map(repo => {
        const additional = repoAdditionalInfo.find((item: any) => item.repoName === repo.name);
        return {
            id: repo.id,
            repoName: repo.name,
            isFork: repo.fork,
            parentFork: repo.parent ? repo.parent.full_name : null,
            description: repo.description,
            generalLanguage: additional && Object.keys(additional.languages)[0],
            contributorsCount: additional?.contributors?.length || 0,
            forksCount: repo.forks_count,
            watchersCount: repo.watchers_count,
            starsCount: repo.stargazers_count,
            updateDate: new Date(repo.pushed_at || repo.created_at),
            cloneUrl: repo.clone_url
        }
    });

    return stylizedRepo;
}

function fillRepositoryItems(repoData: RepoDataType[], currentPage: number) {
    const result = [];
    const startIndex = (currentPage - 1) * 10;
    for (let i = startIndex; i < startIndex + 10; i++) {
        if (i >= repoData.length) {
            break;
        }
        result.push(<RepositoryItem data={repoData[i]} />);
    }
    return result;
}

export default Repositories;