import "./RepositoryItem.css"
import getForksIcon from "../../svg/forksSvg"
import getWatchIcon from "../../svg/watchSvg"
import getStarLogo from "../../svg/starSvg"

function RepositoryItem() {
    return (
        <div className="repositoryItem">
            <span className="repoName">{"overpriced-coffee"}</span>
            <div className="repoFork">
                <span>{"Forked from "} </span>
                <span>{"kontur-courses/react-ts"}</span>
            </div>
            <div className="repoDescription">{"overpriced coffee task"}</div>
            <div className="repoMainInfo">
                <div className="repoLanguage">
                    <span>{"HTML"}</span>
                </div>
                <div className="repoContributors">
                    <span>contributors</span>
                    <span>{"4"}</span>
                </div>
            </div>
            <div className="repoAdditional">
                <div>
                    {getForksIcon()}
                    <span>{23}</span>
                </div>
                <div>
                    {getWatchIcon()}
                    <span>{"2k"}</span>
                    
                </div>
                <div>
                    {getStarLogo()}
                    <span>{36}</span>
                </div>
            </div>
            <span className="repoDate">{"Updated 1 hour ago"}</span>
        </div>
    );
}

export default RepositoryItem;