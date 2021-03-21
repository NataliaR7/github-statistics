import UserHead from './UserHead';
import UserAdditional from './UserAdditional';
import { Octokit } from "@octokit/rest"
import { useState, useEffect } from 'react';
import './UserPanel.css';

export const octokit = new Octokit();
type UserDataType = {
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

const user = 'Aminopyridin';

function UserPanel() {
  const [userData, setUserData] = useState<UserDataType>({});
  const [isLoadedData, setIsLoadedData] = useState(false);

  

  async function getUserData() {
  
    const responseUser = await fetch('/user');
    const data = await responseUser.json();
    const activ = await fetch('/activity')
    const responseStars = await fetch('/starred');
    const userStars = await responseStars.json();
    const count = `${userStars.headers.link}`.match(/=(\d+)>; rel=\"last\"/);

    const responseOrgs = await fetch('/orgs');
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
      avatar: data.avatar_url,
      username: data.login,
      followerCount: data.followers,
      followingCount: data.following,
      starCount: count ? count[1] : '0',
      reposCount: data.public_repos,
      forkCount: 0,
      location: data.location,
      email: data.email,
      site: data.blog,
      name: data.name,
      orgs: orgs,
      createdDate: new Date(data.created_at),
    });

  }

  
  useEffect(() => {
    getUserData();
    setIsLoadedData(true);
  }, []);



  const renderData = () => {
    console.log(userData)
    return (
      <>
        <UserHead
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
          <span>{`${userData.createdDate?.getDate()}.${userData.createdDate?.getMonth()}.${userData.createdDate?.getFullYear()}`}</span>
        </div>
      </>
    )
  }

  return (
    <div className="userPanel">
      {isLoadedData ? renderData() : null}

    </div>
  );
}

export default UserPanel;