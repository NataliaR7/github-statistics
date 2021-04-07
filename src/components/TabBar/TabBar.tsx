import { useState } from 'react';
import { Redirect } from 'react-router';
import Tab from '../../containers/TabBar/Tab';
import './TabBar.css';


function TabBar() {
  const [isBack, setIsBack] = useState(false);
  return (
    <div className="tabBar">
      {isBack && <Redirect to="/nickname" />}
      <div className="lineBar"></div>
      <div className="lineBar"></div>
      <Tab title={"MAIN INFO"} color={"#F98365"} path="/main"/>
      <Tab title={"REPOSITORIES"} color={"#CDDA95"} path="/repos"/>
      <Tab title={"COMPARATION"} color={"#A1DFFB"} path="/compare"/>
      <button onClick={() => setIsBack(true)}>Change user</button>
    </div>
  );
}

export default TabBar;