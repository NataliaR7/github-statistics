import './TabBar.css';
import { useState } from 'react';
import { Redirect } from 'react-router';
import Tab from '../../containers/Tab';
import { PagePath } from '../../resources/constants';

interface PropsType {
  activePage: string
}

const TabBar: React.FC<PropsType> = props => {
  const [isBack, setIsBack] = useState(false);

  const isActive = (currentTab: string) => {
    return currentTab === props.activePage
  }

  return (
    <header className="tabBar">
      {isBack && <Redirect to="/nickname" />}
      <div className="lineBar"></div>
      <div className="lineBar"></div>
      <Tab title={"MAIN INFO"} path={PagePath.Main} isActive={isActive(PagePath.Main)} />
      <Tab title={"REPOSITORIES"} path={PagePath.Repos} isActive={isActive(PagePath.Repos)} />
      <Tab title={"COMPARATION"} path={PagePath.Compare} isActive={isActive(PagePath.Compare)} />
      <Redirect to={props.activePage} />
      <button onClick={() => setIsBack(true)}>Change user</button>
    </header>
  );
}

export default TabBar;