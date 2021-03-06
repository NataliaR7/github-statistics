import "./RepositoryItem.css";
import getForksIcon from "../../resources/forksSvg";
import getWatchIcon from "../../resources/watchSvg";
import getStarLogo from "../../resources/starSvg";
import { getStylizedDate } from '../../extentions/extentions';
import { getRandomColor } from '../../resources/colors';
import { languageColors } from '../../resources/constants';

interface PropsType {
    data: {
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
    }
    selectRepo: (e: number) => void;
}

const RepositoryItem: React.FC<PropsType> = props => {
    const data = props.data;
    return (
        <div className="repositoryItem" key={data.id} onClick={() => props.selectRepo(data.id)}>
            <span className="repoName">{data.repoName}</span>
            {data.isFork && <div className="repoFork">
                <span>{"Forked from "} </span>
                <span>{data.parentFork}</span>
            </div>}
            <div className="repoDescription">{data.description}</div>
            <div className="repoMainInfo">
                {data.generalLanguage && <div className="repoLanguage" style={{ backgroundColor: `${getColorToLanguage(data.generalLanguage)}80` }}>
                    <span>{data.generalLanguage}</span>
                </div>}
                <div className="repoContributors">
                    <span>contributors</span>
                    <span>{data.contributorsCount}</span>
                </div>
            </div>
            <div className="repoAdditional">
                <div>
                    {getForksIcon()}
                    <span>{data.forksCount}</span>
                </div>
                <div>
                    {getWatchIcon()}
                    <span>{data.watchersCount}</span>

                </div>
                <div>
                    {getStarLogo()}
                    <span>{data.starsCount}</span>
                </div>
            </div>
            <span className="repoDate">Updated {getStylizedDate(data.updateDate)}</span>
        </div>
    );
}

function getColorToLanguage(language: string) {
    if (languageColors.has(language)) {
        return languageColors.get(language);
    }
    let newColor = getRandomColor();
    while (languageColors.has(newColor) || languageColors.keys.length > 15) {
        newColor = getRandomColor();
    }
    languageColors.set(language, newColor);
}

export default RepositoryItem;