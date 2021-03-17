import Tab from '../../containers/TabBar/Tab';
import './TabBar.css';


function TabBar() {
  return (
    <div className="tabBar">
      <div className="lineBar"></div>
      <div className="lineBar"></div>
      <Tab title={"MAIN INFO"} color={"#F98365"} path="/main"/>
      <Tab title={"REPOSITORIES"} color={"#CDDA95"} path="/repo"/>
      <Tab title={"COMPARATION"} color={"#A1DFFB"} path="/compare"/>
    </div>
  );
}

export default TabBar;