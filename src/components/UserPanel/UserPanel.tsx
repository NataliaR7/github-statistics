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
  //const [repoData, setRepoData] = useState<RepoDataType>({});
  const [isLoadedData, setIsLoadedData] = useState(false);

  async function getUserData() {
    const userDataReq = await octokit.request('GET /users/{username}', {
      username: user
    });

    const userStarsReq = await octokit.request('GET /users/{username}/starred?per_page=1', {
      username: user
    });

    const userOrgsReq = await octokit.request('GET /users/{username}/orgs', {
      username: user
    });

    console.log(userDataReq, "user");
    console.log(userStarsReq, "stars");
    console.log(userOrgsReq, "orgs");
    const data = userDataReq.data;
    const count = `${userStarsReq.headers.link}`.match(/=(\d+)>; rel=\"last\"/);
    const orgs = userOrgsReq.data.map((org) => {
      return {
        avatar: org.avatar_url,
        login: org.login,
        url: org.url
      }
    });
    //console.log(orgs);

    setUserData(userData => userData = {
      ...userData,
      avatar: data.avatar_url,
      username: data.login,
      followerCount: data.followers,
      followingCount: data.following,
      starCount: count ? count[1] : '0',
      location: data.location,
      email: data.email,
      site: data.blog,
      name: data.name,
      orgs: orgs,
      createdDate: new Date(data.created_at),
    });

  }

  async function getUserAdditional() {

  }

  // async function getRepoData() {
  //   const repoDataReq = await octokit.request('GET /users/{username}/repos?per_page=1', {
  //     username: user
  //   });
  //   console.log(repoDataReq, "repo");
  // }

  useEffect(() => {
    getUserData();
    //getRepoData();
    setIsLoadedData(true);
  }, [isLoadedData]);



  const renderData = () => {
    return (
      <>
        <UserHead
          avatar={userData.avatar}
          username={userData.username}
          followerCount={userData.followerCount}
          followingCount={userData.followingCount}
          starCount={userData.starCount} />
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