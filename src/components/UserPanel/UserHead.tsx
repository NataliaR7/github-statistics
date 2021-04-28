import './UserHead.css';
import starSvg from '../../resources/starSvg';

interface PropsType {
    data: {
        userUrl: string;
        avatar: string;
        username: string;
        followerCount: number;
        followingCount: number;
        starCount: string;
        reposCount: number;
        forkCount: number;
    }
};

const UserHead: React.FC<PropsType> = props => {
    const data = props.data;
    return (
        <div className="userHead">
            <a href={data.userUrl} target="_blank"><img src={data.avatar} alt="avatar" /></a>
            <span className="username canSelect">{data.username}</span>
            <div className="separatorLine"></div>
            <div className="commonInfo">
                <span className="follower">{data.followerCount} follower</span>
                <span className="following">{data.followingCount} following</span>
                {starSvg()}<span> {data.starCount}</span>
            </div>
            <div className="repoInfo">
                <span>{data.reposCount} public repositories</span>
                <span>{data.forkCount} forks</span>
            </div>
        </div>
    );
}

export default UserHead;