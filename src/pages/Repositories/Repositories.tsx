import RepositoryItem from "../../containers/RepositoryItem"
import Repository from '../../containers/Repository'
import NavigationPagePanel from '../../containers/NavigationPagePanel'
import { useEffect, useRef, useState } from 'react';
import { sortReposData } from '../../generalLogic/repositoryLogic';
// import {store} from '../../store'
import "./Repositories.css"
import Loader from '../../components/Loader/Loader'


type RepoDataType = {
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

type ReposType = {
    activeRepoId: number;
    isRepoActive: boolean;
    currentReposPage: number;
}

function Repositories(props: ReposType) {
    const [repoData, setRepoData] = useState<Array<RepoDataType>>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);
    const [isStartLoader, setIsStartLoader] = useState(false);


    const loadReposData = async function () {
        const repositories = await fetch('/repos');
        const response = await repositories.json();
        const repoAdditionalInfo = await fetch('/repoAdditionalInfo');

        const additionalRes = await repoAdditionalInfo.json();

        const sortPeros = await sortReposData(response);
        //console.log(response, "Repo");

        const stylizedRepo = sortPeros.map(repo => {
            const additional = additionalRes.find((item: any) => item.repoName === repo.name)
            //console.log(additional, "additional");
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

        setRepoData(repoData => repoData = stylizedRepo);
    }

    useEffect(() => {
        delayToLoader();
        loadReposData().then(() => {
            setIsLoadedData(true);
        });
    }, []);

    const fillRepositoryItems = (currentPage: number) => {
        let result = [];
        for (let i = (currentPage - 1) * 10; i < (currentPage - 1) * 10 + 10; i++) {
            if (i >= repoData.length) {
                break;
            }
            result.push(<RepositoryItem data={repoData[i]} />);
        }
        return result;
    }

    const delayToLoader = () => {
        setTimeout(() => setIsStartLoader(true), 100);
    }


    return (
        <div className="repositoriesContent">

            {props.isRepoActive ? <Repository /> :
                <div className="repositoriesPage">
                    {isLoadedData
                        ? repoData.length === 0
                            ? <span className="warning">This user has no repositories</span>
                            : <>
                                <div className="repositories">
                                    {isLoadedData && fillRepositoryItems(props.currentReposPage || 1)}
                                </div>
                                {isLoadedData && <NavigationPagePanel pageCount={Math.ceil(repoData.length / 10)} />}
                            </>
                        : isStartLoader && <Loader withoutLabel={true}/>
                    }
                </div>
            }
        </div>
    );
}

export default Repositories;