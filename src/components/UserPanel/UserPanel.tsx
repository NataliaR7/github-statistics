import UserHead from './UserHead';
import UserAdditional from './UserAdditional';
import changeUserSvg from '../../resources/changeUserSvg'
import { Octokit } from "@octokit/rest"
import { useState, useEffect } from 'react';
import './UserPanel.css';

export const octokit = new Octokit();
type UserDataType = {
  userUrl?: string;
  avatar?: string;
  username?: string;
  followerCount?: number;
  followingCount?: number;
  starCount?: string;
  createdDate?: Date;
  location?: string | null;
  email?: string | null;
  reposCount?: number;
  forkCount?: number;
  site?: string | null;
  name?: string | null;
  orgs?: ({
    avatar: string;
    login: string;
    url: string;
  })[]
};

type RepoDataType = {
  repositories?: [];
  repoCount?: number;
};

interface PropsType {
  setCompareNickname?: (value: string) => void;
  username?: string;
}

const user = 'Aminopyridin';

function UserPanel(props: PropsType) {
  const [userData, setUserData] = useState<UserDataType>({});
  const [isLoadedData, setIsLoadedData] = useState(false);



  async function getUserData() {
    const queryUsername = props.username ? "?username=" + props.username : "";
    
    const userInfo = await (await fetch(`/user${queryUsername}`)).json();
    const repositories = await (await fetch(`/repos${queryUsername}`)).json();
    const forks = repositories.filter((repo: any) => repo.fork);

    const userStars = await (await fetch(`/starred${queryUsername}`)).json();
    const count = `${userStars.headers.link}`.match(/=(\d+)>; rel=\"last\"/);

    const responseOrgs = await fetch(`/orgs${queryUsername}`);
    const userOrgs = await responseOrgs.json();

    const orgs = userOrgs.map((org: any) => {
      return {
        avatar: org.avatar_url,
        login: org.login,
        url: org.url
      }
    });


    setUserData(userData => userData = {
      ...userData,
      userUrl: userInfo.html_url,
      avatar: userInfo.avatar_url,
      username: userInfo.login,
      followerCount: userInfo.followers,
      followingCount: userInfo.following,
      starCount: count ? count[1] : '0',
      reposCount: userInfo.public_repos,
      forkCount:  forks.length,
      location: userInfo.location,
      email: userInfo.email,
      site: userInfo.blog,
      name: userInfo.name,
      orgs: orgs,
      createdDate: new Date(userInfo.created_at),
    });

  }


  useEffect(() => {
    getUserData().then(() =>
      setIsLoadedData(true)
    )
  }, []);



  const renderData = () => {
    return (
      <>
        <div 
        title="change user" 
        className={`changeUserIcon` + ` ${props.username !== undefined && 'show'}`}
        onClick={ () => props.setCompareNickname && props.setCompareNickname('')}>
          {changeUserSvg()}
        </div>
        <UserHead
          userUrl={userData.userUrl}
          avatar={userData.avatar}
          username={userData.username}
          followerCount={userData.followerCount}
          followingCount={userData.followingCount}
          starCount={userData.starCount}
          repoCount={userData.reposCount}
          forkCount={userData.forkCount} />
        <UserAdditional
          location={userData.location}
          email={userData.email}
          site={userData.site}
          name={userData.name}
          orgs={userData.orgs} />
        <div className="created">
          <span>created at</span>
          <span>{`${userData.createdDate?.getDate() || ""}.${userData.createdDate?.getMonth() || ""}.${userData.createdDate?.getFullYear() || ""}`}</span>
        </div>
      </>
    )
  }

  return (
    <div className="userPanel">
      {isLoadedData && renderData()}

    </div>
  );
}

export default UserPanel;