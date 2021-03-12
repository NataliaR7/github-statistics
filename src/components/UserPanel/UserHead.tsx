import './UserHead.css';
import starSvg from './starSvg';

type PropType = {
    avatar?: string;
    username?: string;
    followerCount?: number;
    followingCount?: number;
    starCount?: string;
};

function UserHead(props: PropType) {
    return (
        <div className="userHead">
            <img src={props.avatar} alt="avatar" />
            <span className="username">{props.username}</span>
            <div className="separatorLine"></div>
            <div className="commonInfo">

                <span className="follower">{props.followerCount} follower</span>
                <span className="following">{props.followingCount} following</span>
                {starSvg()}<span> {props.starCount}</span>

            </div>
        </div>
    );
}

export default UserHead;