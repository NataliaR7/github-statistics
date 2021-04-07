import './RepoBall.css';
import starSvg from '../../resources/starSvg';
import linkSvg from '../../resources/linkSvg';
import { getStylizedDate } from '../../generalLogic/repositoryLogic';
import { useRef } from 'react';

type RepoBallType = {
    data: {
        id: number;
        starsCount: number;
        repoName: string;
        isFork: boolean;
        updateDate: Date;
        cloneUrl: string;
    }
}

function RepoBall(props: RepoBallType) {
    const message = useRef<HTMLSpanElement>(null);
    const data = props.data;

    function cloneRepo(text: string, target: EventTarget & HTMLSpanElement) {
        navigator.clipboard.writeText(text).then(() => {
            target.classList.add("hidden");
            message?.current?.classList.remove("hide");
            setTimeout(() => {
                target.classList.remove("hidden");
                //message?.classList.add("hide");
            }, 80);
            setTimeout(() => {
                message?.current?.classList.add("hide");
            }, 500);

        })
    }

    return (
        <div className="repoBall" key={data.id}>
            <div className="stars">{starSvg()}<span>{data.starsCount}</span></div>
            <span ref={message} className="copyMessage hide">{"Copied!"}</span>
            <div className="infoRepo">
                <div className="nameRepo">
                    {/* <span ref={message} className="copyMessage hide">{"Copied!"}</span> */}
                    <span>{data.repoName}</span>
                    {data.isFork && <span className="fork">{"Forked"}</span>}
                </div>
                <span onClick={(e) => cloneRepo(data.cloneUrl, e.currentTarget)}>{linkSvg()}</span>
            </div>
            <div className="updateRepo">
                <span>{"updated"}</span>
                <span>{getStylizedDate(data.updateDate)}</span>
            </div>
        </div>
    );
}

export default RepoBall;