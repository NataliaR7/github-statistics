import './UserRepositories.css';
import RepoBall from '../../containers/RepoBall'
import RepoPanel from '../../components/UserRepositories/RepoPanel'
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
      <RepoPanel type="ball" />
    </div>
  );
}

export default UserRepositories;