import "./Repository.css";
import { Redirect } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import RepositoryMainInfo from './RepositoryMainInfo';
import RecentActivityPanel from '../../components/UserRecentActivity/RecentActivityPanel';
import LanguagesChart from "../../components/UserLanguages/LanguagesChart";
import IssuesPullsStat from "../../components/ReposIssues/IssuesItem";
import IssueBar from "./IssueBar";
import Loader from "../../components/Loader/Loader";
import linkSvg from '../../resources/linkSvg';
import { getStylizedDate } from '../../generalLogic/repositoryLogic';
import { cloneRepo } from '../../extentions/extentions';
import Head from "../../components/Head/Head";

interface PropsType {
    activeRepoId: number;
    isRepoActive: boolean;
    deactiveteRepo: () => void;
}

const Repository: React.FC<PropsType> = props => {
    const [isBack, setIsBack] = useState(false);
    const [repoData, setRepoData] = useState<any>({});
    const [issuesData, setIssuesData] = useState<any>({});
    const [isLoadedData, setIsLoadedData] = useState(false);
    const message = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        loadRepositoryData(props.activeRepoId)
            .then((repoData) => {
                setRepoData((data: any) => data = repoData);
                return loadIssuesData(repoData.name);
            })
            .then((issuesData) => {
                setIssuesData((data: any) => data = issuesData);
                setIsLoadedData(true);
            })
    }, []);

    return (
        <div className="repository">
            {!props.isRepoActive && <Redirect to="/repos" />}
            {isBack && <Redirect to="/repos" />}
            {(!isLoadedData) && <Loader withoutLabel={true} />}
            {isLoadedData &&
                <>
                    <div className="repositoryHead">
                        <span className="repositoryName canSelect">
                            <span className="noSelect" onClick={() => {
                                props.deactiveteRepo();
                                setIsBack(true);
                            }}>{"⮜"}</span>
                            {repoData.name}
                            <span onClick={(e) => cloneRepo(repoData.clone_url, e.currentTarget, message)}>{linkSvg()}</span>
                            <span ref={message} className="copyMessage hide">{"Copied!"}</span>
                        </span>
                        {repoData.fork && <span className="repositoryFork">Forked from <span className="canSelect">{repoData.parent.full_name}</span></span>}
                        <div className="upadateDate"><span>updated</span><span>{getStylizedDate(new Date(repoData.pushed_at || repoData.created_at))}</span></div>
                    </div>
                    <RepositoryMainInfo data={getRepoMainInfo(repoData)} />
                    <div className="statistics">
                        <div className="languageRepo">
                            <Head title="languages" />
                            <LanguagesChart reposName={repoData.name} width={"450"} height={"250"} />
                        </div>
                        <div className="issueAvgRepo">
                            <Head title="pull request and issue closings statistics" />
                            <IssuesPullsStat reposName={repoData.name} />
                        </div>
                        <div className="activityRepo">
                            <Head title="recent activity" />
                            <RecentActivityPanel type="repo" repoName={repoData.name} />
                        </div>
                        <div className="issueCountRepo">
                            <IssueBar openCount={issuesData.issues.open} closedCount={issuesData.issues.closed} />
                            <IssueBar isPullRequest={true} openCount={issuesData.pullRequest.open} closedCount={issuesData.pullRequest.closed} />
                        </div>
                    </div>
                </>}
        </div>
    );
}

async function loadRepositoryData(activeRepoId: number) {
    return await (await fetch(`/repo?repoId=${activeRepoId}`)).json();
}

async function loadIssuesData(repoName: string) {
    const issueCount = await (await fetch(`/repoIssuesCount`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ reposName: `${repoName}` })
    })).json();

    const pullRequestCount = await (await fetch(`/repoPullsCount`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ reposName: `${repoName}` })
    })).json();

    return { issues: issueCount, pullRequest: pullRequestCount };
}

function getRepoMainInfo(repoData: any) {
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

export default Repository;