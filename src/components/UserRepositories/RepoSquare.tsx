import './RepoSquare.css';
import starSvg from '../../resources/starSvg';
import linkSvg from '../../resources/linkSvg';
import { getStylizedDate } from '../../generalLogic/repositoryLogic';
import { useRef, useState } from 'react';
import { Redirect } from 'react-router';

type PropsType = {
    data: {
        id: number;
        starsCount: number;
        repoName: string;
        isFork: boolean;
        updateDate: Date;
        cloneUrl: string;
    }
}

function RepoSquare(props: PropsType) {
    const message = useRef<HTMLSpanElement>(null);
    const data = props.data;

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
        <div className="repoSquare" key={data.id}>
            <div className="mainInfo">
                <span className="nameRepo">{`${data.repoName}`}</span>
                <span onClick={(e) => cloneRepo(data.cloneUrl, e.currentTarget)}>{linkSvg()}</span>
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