import './RepoSquare.css';
import starSvg from '../../resources/starSvg';
import linkSvg from '../../resources/linkSvg';
import { getStylizedDate } from '../../generalLogic/repositoryLogic';
import { useRef } from 'react';
import { cloneRepo } from '../../extentions/extentions'

interface PropsType {
    data: {
        id: number;
        starsCount: number;
        repoName: string;
        isFork: boolean;
        updateDate: Date;
        cloneUrl: string;
    }
}

const RepoSquare: React.FC<PropsType> = props => {
    const message = useRef<HTMLSpanElement>(null);
    const data = props.data;

    return (
        <div className="repoSquare" key={data.id}>
            <div className="mainInfo">
                <span className="nameRepo">{`${data.repoName}`}</span>
                <span onClick={(e) => cloneRepo(data.cloneUrl, e.currentTarget, message)}>{linkSvg()}</span>
                <span ref={message} className="copyMessage hide">{"Copied!"}</span>
            </div>
            <div className="stars">{starSvg()}<span>{data.starsCount}</span></div>
            <div className="updateRepo">
                <span>{"updated"}</span>
                <span>{getStylizedDate(data.updateDate)}</span>
            </div>
        </div>
    );
}

export default RepoSquare;