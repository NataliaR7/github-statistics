import { useState } from 'react';
import { Redirect } from 'react-router';
import { store, preloadedState } from '../../store'
import Tab from '../../containers/Tab';
import './TabBar.css';


interface TabBarType {
  activePage: string,
  onNavigate: (e: string) => void
}

function TabBar(props: TabBarType) {
  const [isBack, setIsBack] = useState(false);

  const isActive = (currentTab: string) => {
    console.log(currentTab, props.activePage)
    return currentTab === props.activePage
  }

  return (
    <div className="tabBar">
      {isBack && <Redirect to="/nickname" />}
      <div className="lineBar"></div>
      <div className="lineBar"></div>
      <Tab title={"MAIN INFO"} color={"#F98365"} path="/main" isActive={isActive("/main")} />
      <Tab title={"REPOSITORIES"} color={"#CDDA95"} path="/repos" isActive={isActive("/repos")} />
      <Tab title={"COMPARATION"} color={"#A1DFFB"} path="/compare" isActive={isActive("/compare")} />
      <Redirect to={props.activePage} />
      <button onClick={() => setIsBack(true)}>Change user</button>
    </div>
  );
}

export default TabBar;