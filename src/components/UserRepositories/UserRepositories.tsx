import './UserRepositories.css';
import RepoBall from './RepoBall'
import { useEffect, useState } from 'react';
import { sortReposData } from '../../generalLogic/repositoryLogic';

type RepoDataType = {
  id: number;
  starsCount: number;
  repoName: string;
  isFork: boolean;
  updateDate: Date;
  cloneUrl: string;
};

function UserRepositories() {
  const [repoData, setRepoData] = useState<Array<RepoDataType>>([]);
  const [isLoadedData, setIsLoadedData] = useState(false);

  const loadReposData = async function () {
    const repositories = await fetch('/repos');
    const response = await repositories.json();
    const sortPeros = sortReposData(response).slice(0, 5);

    const stylizedRepo = sortPeros.map(repo => {
      return {
        id: repo.id,
        starsCount: repo.stargazers_count,
        repoName: repo.name,
        isFork: repo.fork,
        updateDate: new Date(repo.pushed_at),
        cloneUrl: repo.clone_url,
      }
    });

    setRepoData(repoData => repoData = stylizedRepo);
  }

  useEffect(() => {
    loadReposData().then(() => {
      setIsLoadedData(true);
    })

  }, []);

  return (
    <div className="userRepositories">
      <div className="head">
        <span>repositories</span>
      </div>
      {isLoadedData &&
        <div className="balls">
          {repoData.length === 0 
          ? <span className="warning">This user has no repositories</span> 
          : <>
              {repoData[0] && <RepoBall data={repoData[0]} />}
              {repoData[1] && <RepoBall data={repoData[1]} />}
              {repoData[2] && <RepoBall data={repoData[2]} />}
              {repoData[3] && <RepoBall data={repoData[3]} />}
              {repoData[4] && <RepoBall data={repoData[4]} />}
            </>
          }
        </div>
      }
    </div>
  );
}

export default UserRepositories;