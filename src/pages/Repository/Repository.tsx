import "./Repository.css"
// import store from '../../store'
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import RepositoryMainInfo from './RepositoryMainInfo'
import UserRecentActivity from '../../components/UserRecentActivity/UserRecentActivity'
import LanguagesChart from "../../components/UserLanguages/LanguagesChart";
import IssuesPullsStat from "../../components/ReposIssues/IssuesItem"

interface RepoType {
    activeRepoId: number;
    isRepoActive: boolean;
    deactiveteRepo: () => void;
}

// const reposName = "west"
function Repository(props: RepoType) {
    const [isBack, setIsBack] = useState(false);
    const [repoData, setRepoData] = useState<any>({});
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        // fetch("/repoRecentActivity?repo=github-statistics")
        //     .then(res => res.json())
        //     .then((result) => { console.log(result, "REPO_ACTIV") });

        fetch(`/repo?repoId=${props.activeRepoId}`)
            .then((res) => res.json())
            .then((repo) => {
                setRepoData((data: any) => data = repo);
                setIsLoadedData(true);
            });
    }, []);

    const getRepoMainInfo = () => {
        return {
            repoName: repoData.name,
            ownerName: repoData.owner.login,
            ownerAvatar: repoData.owner.avatar_url,
            ownerUrl: repoData.owner.html_url,
            forksCount: repoData.forks_count,
            watchersCount: repoData.watchers_count,
            starsCount: repoData.stargazers_count,
            issuesCount: repoData.open_issues_count,
            description: repoData.description,
        }
    }

    return (
        <div className="repository">
            {!props.isRepoActive && <Redirect to="/repos" />}
            { isBack && <Redirect to="/repos" />}
            {isLoadedData && <>
                {console.log(repoData, "REPO_DATA")}
                <div className="repositoryHead">
                    <span className="repositoryName"><span onClick={() => {
                        // stope.getState().isRepoActive = false;
                        props.deactiveteRepo();
                        setIsBack(true);
                    }}>{"⮜"}</span>{repoData.name}</span>
                    {repoData.fork && <span className="repositoryFork">Forked from {repoData.parent.full_name}</span>}
                </div>
                <RepositoryMainInfo data={getRepoMainInfo()} />
                <div className="statistics">
                    <div className="languageRepo">
                        <LanguagesChart reposName={repoData.name} />
                    </div>
                    <div className="issueAvgRepo">
                        <IssuesPullsStat reposName={repoData.name} />
                    </div>
                    <div className="activityRepo">
                        <UserRecentActivity type="repo" repoName={repoData.name} />
                    </div>
                    <div className="issueCountRepo">

                    </div>

                </div>
            </>}
        </div>
    );
}

export default Repository;