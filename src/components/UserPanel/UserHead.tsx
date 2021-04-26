import './UserHead.css';
import starSvg from '../../resources/starSvg';

type PropType = {
    userUrl?: string;
    avatar?: string;
    username?: string;
    followerCount?: number;
    followingCount?: number;
    starCount?: string;
    repoCount?: number;
    forkCount?: number;
};

function UserHead(props: PropType) {
    return (
        <div className="userHead">
            <a href={props.userUrl} target="_blank"><img src={props.avatar} alt="avatar" /></a>
            <span className="username canSelect">{props.username}</span>
            <div className="separatorLine"></div>
            <div className="commonInfo">
                <span className="follower">{props.followerCount} follower</span>
                <span className="following">{props.followingCount} following</span>
                {starSvg()}<span> {props.starCount}</span>
            </div>
            <div className="repoInfo">
                <span>{props.repoCount} public repositories</span>
                <span>{props.forkCount} forks</span>
            </div>
        </div>
    );
}

export default UserHead;