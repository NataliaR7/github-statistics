import "./Repository.css"
// import store from '../../store'
import { Redirect } from "react-router-dom";
import React, { useEffect, useState, useRef } from 'react';
import RepositoryMainInfo from './RepositoryMainInfo';
import UserRecentActivity from '../../components/UserRecentActivity/UserRecentActivity';
import RecentActivityPanel from '../../components/UserRecentActivity/RecentActivityPanel';
import LanguagesChart from "../../components/UserLanguages/LanguagesChart";
import UserLanguages from '../../components/UserLanguages/UserLanguages';
import IssuesPullsStat from "../../components/ReposIssues/IssuesItem";
import IssueBar from "./IssueBar";
import Loader from "../../components/Loader/Loader";
import linkSvg from '../../resources/linkSvg'
import { getStylizedDate } from '../../generalLogic/repositoryLogic';

interface RepoType {
    activeRepoId: number;
    isRepoActive: boolean;
    deactiveteRepo: () => void;
}

// const reposName = "west"
function Repository(props: RepoType) {
    const [isBack, setIsBack] = useState(false);
    const [repoData, setRepoData] = useState<any>({});
    const [issuesData, setIssuesData] = useState<any>({});
    const [isLoadedData, setIsLoadedData] = useState(false);
    const message = useRef<HTMLSpanElement>(null);
    const [isStopDelayShow, setIsStopDelayShow] = useState(false);

    async function loadData() {
        const repo = await (await fetch(`/repo?repoId=${props.activeRepoId}`)).json();

        const issueCount = await (await fetch(`/repoIssuesCount`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ reposName: `${repo.name}` })
        })).json();

        const pullRequestCount = await (await fetch(`/repoPullsCount`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ reposName: `${repo.name}` })
        })).json();

        console.log(issueCount, pullRequestCount, "pullRequestCount")


        await setRepoData((data: any) => data = repo);
        await setIssuesData((data: any) => data = { issues: issueCount, pullRequest: pullRequestCount });
        await setIsLoadedData(true);
    }

    useEffect(() => {

        // fetch(`/repo?repoId=${props.activeRepoId}`)
        //     .then((res) => res.json())
        //     .then((repo) => {
        //         setRepoData((data: any) => data = repo);
        //         setIsLoadedData(true);
        //     });
        loadData();
        // isLoadedData && delayToLoader();
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

    function cloneRepo(text: string, target: EventTarget & HTMLSpanElement) {
        navigator.clipboard.writeText(text).then(() => {
            target.classList.add("hidden");
            message?.current?.classList.remove("hide");
            setTimeout(() => {
                target.classList.remove("hidden");
            }, 80);
            setTimeout(() => {
                message?.current?.classList.add("hide");
            }, 500);

        })
    }

    return (
        <div className="repository">
            {!props.isRepoActive && <Redirect to="/repos" />}
            { isBack && <Redirect to="/repos" />}
            {(!isLoadedData) && <Loader withoutLabel={true} />}
            {isLoadedData &&
                <>
                    {/* {console.log(repoData, "REPO_DATA")} */}
                    <div className="repositoryHead">
                        <span className="repositoryName canSelect"><span className="noSelect" onClick={() => {
                            // stope.getState().isRepoActive = false;
                            props.deactiveteRepo();
                            setIsBack(true);
                        }}>{"⮜"}</span>
                            {repoData.name}
                            <span onClick={(e) => cloneRepo(repoData.clone_url, e.currentTarget)}>{linkSvg()}</span>
                            <span ref={message} className="copyMessage hide">{"Copied!"}</span>
                        </span>
                        {repoData.fork && <span className="repositoryFork">Forked from <span className="canSelect">{repoData.parent.full_name}</span></span>}
                        <div className="upadateDate"><span>updated</span><span>{getStylizedDate(new Date(repoData.pushed_at || repoData.created_at))}</span></div>
                    </div>
                    <RepositoryMainInfo data={getRepoMainInfo()} />
                    <div className="statistics">
                        <div className="languageRepo">
                            {/* <div className="head">
                                <span>languages</span>
                            </div> */}
                            <UserLanguages reposName={repoData.name} width={"450"} height={"250"} />
                        </div>
                        <div className="issueAvgRepo">
                            {/* <div className="head">
                                <span>pull request and issue closings statistics</span>
                            </div> */}
                            <IssuesPullsStat reposName={repoData.name} width={"450"} height={"250"}/>
                        </div>
                        <div className="activityRepo">
                            {/* <UserRecentActivity type="repo" repoName={repoData.name} /> */}
                            <div className="head">
                                <span>recent activity</span>
                            </div>
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

export default Repository;