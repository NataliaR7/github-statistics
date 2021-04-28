import './UserPanel.css';
import UserHead from './UserHead';
import UserAdditional from './UserAdditional';
import changeUserSvg from '../../resources/changeUserSvg';
import { useState, useEffect } from 'react';

interface PropsType {
  setCompareNickname?: (value: string) => void;
  username?: string;
}

interface UserDataType {
  userUrl: string;
  avatar: string;
  username: string;
  followerCount: number;
  followingCount: number;
  starCount: string;
  reposCount: number;
  forkCount: number;
  createdDate?: Date;
  location?: string | null;
  email?: string | null;
  site?: string | null;
  name?: string | null;
  orgs?: ({
    avatar: string;
    login: string;
    url: string;
  })[]
};

const UserPanel: React.FC<PropsType> = props => {
  const [userData, setUserData] = useState<UserDataType>(userDataDefault);
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    loadUserData(props.username)
      .then((result) => {
        setUserData(userData => userData = getNewUserDataState(result));
        setIsLoadedData(true);
      })
  }, []);

  return (
    <div className="userPanel">
      {isLoadedData && <>
        <div
          title="change user"
          className={`changeUserIcon` + ` ${props.username !== undefined && 'show'}`}
          onClick={() => props.setCompareNickname && props.setCompareNickname('')}>
          {changeUserSvg()}
        </div>
        <UserHead data={userData} />
        <UserAdditional data={userData} />
        <div className="created">
          <span>created at</span>
          <span>{`${userData.createdDate?.getDate() || ""}.${userData.createdDate?.getMonth() || ""}.${userData.createdDate?.getFullYear() || ""}`}</span>
        </div>
      </>}
    </div>
  );
}

const userDataDefault = {
  userUrl: '',
  avatar: '',
  username: '',
  starCount: '',
  followerCount: 0,
  followingCount: 0,
  reposCount: 0,
  forkCount: 0,
}

async function loadUserData(username?: string) {
  const queryUsername = username ? "?username=" + username : "";

  const userInfo = await (await fetch(`/user${queryUsername}`)).json();
  const repositories = await (await fetch(`/repos${queryUsername}`)).json();
  const forks = repositories.filter((repo: any) => repo.fork);

  const userStars = await (await fetch(`/starred${queryUsername}`)).json();
  const starCount = `${userStars.headers.link}`.match(/=(\d+)>; rel=\"last\"/);

  const userOrgs = await (await fetch(`/orgs${queryUsername}`)).json();
  const orgs = userOrgs.map((org: any) => {
    return {
      avatar: org.avatar_url,
      login: org.login,
      url: org.html_url,
    }
  });

  return { userInfo, forks, starCount, orgs };
}

function getNewUserDataState(data: any) {
  const { userInfo, starCount, forks, orgs } = data;
  return {
    userUrl: userInfo.html_url,
    avatar: userInfo.avatar_url,
    username: userInfo.login,
    followerCount: userInfo.followers,
    followingCount: userInfo.following,
    starCount: starCount ? starCount[1] : '0',
    reposCount: userInfo.public_repos,
    forkCount: forks.length,
    location: userInfo.location,
    email: userInfo.email,
    site: userInfo.blog,
    name: userInfo.name,
    orgs: orgs,
    createdDate: new Date(userInfo.created_at),
  };
}

export default UserPanel;