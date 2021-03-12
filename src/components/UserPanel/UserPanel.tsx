import UserHead from './UserHead';
import { Octokit } from "@octokit/rest"
import { useState, useEffect } from 'react';

const octokit = new Octokit();
type StateType = {
  avatar?: string;
  username?: string;
  followerCount?: number;
  followingCount?: number;
  starCount?: string;
};

function UserPanel() {
  const [userData, setUserData] = useState<StateType>({});
  const [isLoadedData, setIsLoadedData] = useState(false);

  useEffect(() => {
    const userDataReq = octokit.request('GET /users/{username}', {
      username: 'Aminopyridin'
    })
      .then((res) => {
        const data = res.data;
        console.log(res)
        setUserData(userData => userData = {
          ...userData,
          avatar: data.avatar_url,
          username: data.login,
          followerCount: data.followers,
          followingCount: data.following
        });
        console.log("1")
        //setIsLoadedData(true);
        // console.log(res.data)
        // octokit.request(data.starred_url)
        //   .then((res) => {
        //     console.log(res, " 666666")
        //   });
      });

    const userStarsReq = octokit.request('GET /users/{username}/starred?per_page=1', {
      username: 'Aminopyridin'
    })
      .then((res) => {
        console.log(res)
        const count = `${res.headers.link}`.match(/=(\d+)>; rel=\"last\"/)
        setUserData(userData => userData = {
          ...userData,
          starCount: count ? count[1] : '0'
        });
        console.log(userData);

        console.log("2")
        // console.log(res.data)
      });

    Promise.all([userDataReq, userStarsReq]).then(() => {
      setIsLoadedData(true);
    })
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