import "./RepositoryMainInfo.css";
import { useEffect, useState } from 'react';

interface PropsType {
    data: {
        repoName: string;
        ownerName: string;
        ownerAvatar: string;
        ownerUrl: string;
        forksCount: number;
        watchersCount: number;
        starsCount: number;
        size: number;
        description?: string;
    }
}

const RepositoryMainInfo: React.FC<PropsType> = props => {
    const data = props.data;
    const [contributors, setContributors] = useState<any[]>([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        fetch(`/repoAdditionalInfo`)
            .then((res) => res.json())
            .then((repo) => {
                const mainContributors = getContributors(repo, data.repoName);
                setContributors(mainContributors);
                setIsLoadedData(true);
            });
    }, []);

    return (
        <div className="repositoryMainInfo">
            <div className="repoInfoComponent">
                <div className="ownerPanel">
                    <span className="header">owner</span>
                    <img src={data.ownerAvatar} alt="ownerAvatar" />
                    <span>{data.ownerName}</span>
                </div>
                <div className="separator"></div>
                <div className="infoPanel">
                    <span className="header info">info</span>
                    <span>Forks <span>{data.forksCount}</span></span>
                    <span>Stars <span>{data.starsCount}</span></span>
                    <span>Watchers <span>{data.watchersCount}</span></span>
                    <span>Size <span>{formatBytes(data.size)}</span></span>
                </div>
                <div className="separator"></div>
                <div className="contributorsPanel">
                    <span className="header">main contributors</span>
                    {isLoadedData && <div className="contributors">
                        {contributors.length !== 0
                            ? fillContributors(contributors)
                            : "No contributors"}
                    </div>}
                </div>
            </div>
            <div className="repoAbout">
                <span className="title">about</span>
                <span className="repositoryDescription canSelect">{data.description || "No description"}</span>
            </div>
        </div>
    );
}

function formatBytes(value: number) {
    if (value > 1024 * 1024)
      return `${(value / (1024 * 1024)).toFixed(0)}GB`
    if (value > 1024)
      return `${(value / 1024).toFixed(0)}MB`
    if (value > 0)
      return `${(value).toFixed(0)}KB`
    return `${value}B`
  }

function getContributors(source: any[], repoName: string) {
    const currentRepo = source.find(repo => repo.repoName === repoName);
    const contributors = currentRepo && currentRepo.contributors?.filter((c: any) => c.type === "User");
    return contributors ? contributors.splice(0, contributors.length > 3 ? 3 : contributors.length) : [];
}

function fillContributors(contributors: any[]) {
    return contributors.map(people =>
        <a href={people.html_url} target="_blank" key={people.login}>
            <img src={people.avatar_url} alt="contributorAvatar" title={people.login} />
        </a>);
}

export default RepositoryMainInfo;