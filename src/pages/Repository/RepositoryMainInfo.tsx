import "./RepositoryMainInfo.css"
import React, { useEffect, useState } from 'react';

interface RepoInfoType {
    data: {
        repoName: string;
        ownerName: string;
        ownerAvatar: string;
        ownerUrl: string;
        forksCount: number;
        watchersCount: number;
        starsCount: number;
        issuesCount: number;
        description?: string;
    }
}

function RepositoryMainInfo(props: RepoInfoType) {
    const data = props.data;
    const [contributors, setContributors] = useState<any[]>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        fetch(`/repoAdditionalInfo`)
            .then((res) => res.json())
            .then((repo) => {
                const mainContributors = getContributors(repo);
                setContributors(mainContributors);
                setIsLoadedData(true);
            });
    }, []);

    const getContributors = (source: any[]) => {
        const currentRepo = source.find(repo => repo.repoName === data.repoName);
        const contributors = currentRepo && currentRepo.contributors?.filter((c: any) => c.type === "User");
        return contributors ? contributors.splice(0, contributors.length > 3 ? 3 : contributors.length) : [];
    }
    const fillContributors = () => {
        return contributors.map(people =>
            <a href={people.html_url} target="_blank">
                <img src={people.avatar_url} alt="contributorAvatar" title={people.login} />
            </a>)
    }

    return (
        <div className="repositoryMainInfo">
            {/* <div className="repoAdditionalPanel"> */}
            <div className="repoInfoComponent">
                <div className="ownerPanel">
                    <span className="header">owner</span>
                    <img src={data.ownerAvatar} alt="ownerAvatar" />
                    <span>{data.ownerName}</span>
                </div>
                <div className="separator"></div>
                <div className="infoPanel">
                    <span className="header">info</span>
                    <span>Forks <span>{data.forksCount}</span></span>
                    <span>Stars <span>{data.starsCount}</span></span>
                    <span>Watchers <span>{data.watchersCount}</span></span>
                    <span>Open issues <span>{data.issuesCount}</span></span>
                </div>
                <div className="separator"></div>
                <div className="contributorsPanel">
                    <span className="header">main contributors</span>
                    {isLoadedData && <div className="contributors">
                        {contributors.length !== 0
                            ? fillContributors()
                            : "No contributors"}
                        {/* <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="contributorAvatar" />
                            <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="contributorAvatar" />
                            <img src="https://avatars.githubusercontent.com/u/6056107?v=4" alt="contributorAvatar" /> */}
                    </div>}
                </div>
            </div>
            {/* </div> */}

            <div className="repoAbout">
                <span className="title">about</span>
                <span className="repositoryDescription canSelect">{data.description || "No description"}</span>
            </div>
        </div>
    );
}

export default RepositoryMainInfo;