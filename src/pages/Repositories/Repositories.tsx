import RepositoryItem from "../../containers/RepositoryItem"
import Repository from '../Repository/Repository'
import NavigationPagePanel from '../../containers/NavigationPagePanel'
import { useEffect, useRef, useState } from 'react';
import { sortReposData } from '../../generalLogic/repositoryLogic';
import stope from '../../store'
import "./Repositories.css"


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


    const loadReposData = async function () {
        const repositories = await fetch('/repos');
        const response = await repositories.json();
        const repoAdditionalInfo = await fetch('/repoAdditionalInfo');
        const additionalRes = await repoAdditionalInfo.json();
        console.log(response, "repos");
        console.log(additionalRes, "additional");
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
                generalLanguage: Object.keys(additional.languages)[0],
                contributorsCount: additional?.contributors?.length || 0,
                forksCount: repo.parent ? repo.parent.forks_count : repo.forks_count,
                watchersCount: repo.parent ? repo.parent.watchers_count : repo.watchers_count,
                starsCount: repo.parent ? repo.parent.stargazers_count : repo.stargazers_count,
                updateDate: new Date(repo.pushed_at),
                cloneUrl: repo.clone_url
            }
        });

        setRepoData(repoData => repoData = stylizedRepo);
    }

    useEffect(() => {
        loadReposData().then(() => {
            setIsLoadedData(true);
        })
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




    return (
        <div className="repositoriesContent">
            {props.isRepoActive ? <Repository /> :
                <div className="repositoriesPage">
                    {repoData.length === 0
                        ? <span className="warning">This user has no repositories</span>
                        : <>
                            <div className="repositories">
                                {isLoadedData && fillRepositoryItems(props.currentReposPage || 1)}
                            </div>
                            {isLoadedData && <NavigationPagePanel pageCount={Math.ceil(repoData.length / 10)} />}
                        </>
                    }
                </div>
            }
        </div>
    );
}

export default Repositories;