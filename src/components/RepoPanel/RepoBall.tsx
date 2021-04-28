import './RepoBall.css';
import starSvg from '../../resources/starSvg';
import linkSvg from '../../resources/linkSvg';
import { getStylizedDate } from '../../extentions/extentions';
import { useRef, useState } from 'react';
import { Redirect } from 'react-router';
import { cloneRepo } from '../../extentions/extentions';

interface PropsType {
    data: {
        id: number;
        starsCount: number;
        repoName: string;
        isFork: boolean;
        updateDate: Date;
        cloneUrl: string;
    }
    selectRepo: (value: number) => void;
    isRepoActive: boolean;
}

const RepoBall: React.FC<PropsType> = props => {
    const [isSelectedRepo, setIsSelectedRepo] = useState(false);
    const message = useRef<HTMLSpanElement>(null);
    const data = props.data;

    return (
        <div className="repoBall" key={data.id} onClick={(e) => {
            const target: any = e.target;
            if (target.tagName === 'path' || target.tagName === 'svg') {
                return;
            }
            props.selectRepo(data.id);
            setIsSelectedRepo(true);
        }}>
            {isSelectedRepo && <Redirect to="/repos" />}
            <div className="stars">{starSvg()}<span>{data.starsCount}</span></div>
            <span ref={message} className="copyMessage hide">{"Copied!"}</span>
            <div className="infoRepo">
                <div className="nameRepo">
                    <span>{data.repoName}</span>
                    {data.isFork && <span className="fork">{"Forked"}</span>}
                </div>
                <span onClick={(e) => cloneRepo(data.cloneUrl, e.currentTarget, message)}>{linkSvg()}</span>
            </div>
            <div className="updateRepo">
                <span>{"updated"}</span>
                <span>{getStylizedDate(data.updateDate)}</span>
            </div>
        </div>
    );
}

export default RepoBall;